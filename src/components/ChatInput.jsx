
import { useState } from "react";
import { Send, Paperclip, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import sendMessage from "../features/sendMessage";
import {
  addMessage,
  updateMessage,
} from "../redux/messageSlice";

function ChatInput({ loading = false }) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const isBusy = loading || isSending;

  const handleSend = async () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isBusy || !selectedConversation?._id) {
      return;
    }

    const conversationId = selectedConversation._id;
    const assistantMessageId = `pending-${Date.now()}`;

    setInput("");
    setIsSending(true);

    // 1. Show user message immediately
    dispatch(
      addMessage({
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmedMessage,
      })
    );

    // 2. Show AI thinking indicator
    dispatch(
      addMessage({
        id: assistantMessageId,
        role: "assistant",
        content: "",
      })
    );

    try {
      // 3. Send request to backend
      const data = await sendMessage({
        prompt: trimmedMessage,
        conversationId,
      });

      if (!data?.response) {
        throw new Error(
          data?.error || "AI response was not received"
        );
      }

      // 4. Replace thinking indicator with AI response
      dispatch(
        updateMessage({
          id: assistantMessageId,
          content: data.response,
        })
      );
    } catch (error) {
      console.error("Message sending failed:", error);

      // Show error instead of leaving Thinking forever
      dispatch(
        updateMessage({
          id: assistantMessageId,
          content: "Sorry, something went wrong. Please try again.",
        })
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 pb-5 pt-3">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#1c1f2b] border border-white/[0.08] rounded-2xl focus-within:border-indigo-500/50 transition-all shadow-lg">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message CortexAI..."
            rows={1}
            disabled={isBusy}
            className="w-full resize-none bg-transparent text-white placeholder:text-gray-500 px-5 pt-4 pb-14 outline-none text-sm min-h-[65px] max-h-40"
          />

          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <button
              type="button"
              title="Attach file (coming soon)"
              disabled={isBusy}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Paperclip size={18} />
            </button>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Sparkles size={13} className="text-indigo-400" />
              <span>
                {isBusy ? "CortexAI is thinking..." : "AI Powered"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isBusy || !selectedConversation?._id}
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Send message"
          >
            {isBusy ? (
              <span className="block w-[17px] h-[17px] rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <Send size={17} />
            )}
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-3">
          CortexAI can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
