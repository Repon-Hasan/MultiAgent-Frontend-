
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

function MessagesList() {
  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const { messages } = useSelector((state) => state.message);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {!messages || messages.length === 0 ? (
          <div className="min-h-[55vh] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
              <Sparkles size={30} className="text-indigo-400" />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-2">
              {selectedConversation?.title || "How can I help you?"}
            </h2>

            <p className="text-gray-500 text-sm max-w-md leading-6">
              Start a conversation with CortexAI. Ask questions, write code,
              solve problems, or explore new ideas.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={message._id || message.id || index}
              role={message.role}
              content={message.content}
            />
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default MessagesList;
