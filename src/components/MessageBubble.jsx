
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

function MessageBubble({ role, content }) {
  const [copied, setCopied] = useState(false);

  const isUser = role === "user";
  const hasContent = content?.trim()?.length > 0;

  const handleCopy = async () => {
    if (!hasContent) return;

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className={`flex gap-3 w-full mb-6 ${
        isUser ? "justify-start" : "justify-end"
      }`}
    >
      {isUser && (
        <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
          <User size={19} className="text-indigo-400" />
        </div>
      )}

      <div
        className={`group relative max-w-[85%] md:max-w-[75%] px-4 py-3 ${
          isUser
            ? "bg-indigo-600 text-white rounded-2xl rounded-tl-sm"
            : "bg-[#1c1f2b] border border-white/[0.06] text-gray-200 rounded-2xl rounded-tr-sm"
        }`}
      >
        {hasContent ? (
          <div className="text-sm leading-7 whitespace-pre-wrap break-words">
            {content}
          </div>
        ) : (
          <div className="flex items-center gap-2 py-1.5">
            <span className="text-sm text-gray-400">
              {isUser ? "Message is empty" : "Thinking"}
            </span>

            {!isUser && (
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((item) => (
                  <span
                    key={item}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                    style={{ animationDelay: `${item * 150}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {hasContent && (
          <button
            onClick={handleCopy}
            title="Copy message"
            className="absolute -bottom-7 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>

      {!isUser && (
        <div className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
          <Bot size={19} className="text-indigo-400" />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
