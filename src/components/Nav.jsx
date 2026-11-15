
import { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  Share2,
  MoreHorizontal,
  Check,
  Zap,
  Bot,
  MessageSquare,
  Clock,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";

function Nav() {
  const [selectedModel, setSelectedModel] = useState("GPT-OSS 120B");
  const [modelOpen, setModelOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [copied, setCopied] = useState("");

  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );

  const { messages } = useSelector((state) => state.message);
  

  //console.log("count",messages)
  // Total messages in current conversation
const messageCount = messages?.length || 0;

  const models = [
    {
      name: "GPT-OSS 120B",
      provider: "Groq",
      icon: Zap,
    },
    {
      name: "Gemini 2.5 Pro",
      provider: "Google",
      icon: Sparkles,
    },
  ];

  const conversationTitle =
    selectedConversation?.title || "New Conversation";

  const conversationDate = selectedConversation?.createdAt
    ? new Date(selectedConversation.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : null;

  const handleCopy = async (value, type) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShare = () => {
    handleCopy(window.location.href, "link");
  };

  const handleCopyId = () => {
    handleCopy(selectedConversation?._id, "id");
    setMoreOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative z-30 w-full min-h-[68px] shrink-0
      flex items-center justify-between gap-3 px-4 sm:px-6
      bg-[#0d0f14]/95 backdrop-blur-xl
      border-b border-white/[0.07]"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 min-w-0">

        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-9 h-9 shrink-0 rounded-xl
          bg-indigo-500/15 border border-indigo-400/20
          flex items-center justify-center"
        >
          <Sparkles size={19} className="text-indigo-400" />
        </motion.div>

        <div className="hidden sm:flex flex-col shrink-0">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Cortex<span className="text-indigo-400">AI</span>
          </h2>
          <p className="text-[9px] text-slate-500 tracking-[0.16em]">
            AI WORKSPACE
          </p>
        </div>

        <div className="hidden sm:block h-8 w-px bg-white/10 mx-1" />

        {/* Selected Conversation Details */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <MessageSquare
              size={14}
              className="text-indigo-400 shrink-0"
            />

            <motion.h3
              key={conversationTitle}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              title={conversationTitle}
              className="text-sm font-medium text-slate-200
              truncate max-w-[150px] sm:max-w-[280px] lg:max-w-[420px]"
            >
              {conversationTitle}
            </motion.h3>
          </div>

          {/* Conversation Metadata */}
          <div className="flex items-center gap-2 mt-1 flex-wrap">

            {selectedConversation ? (
              <>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active conversation
                </span>

                {/* Message Count */}
                <span className="text-slate-700">·</span>

                <span
                  title={`${messageCount} messages in this conversation`}
                  className="flex items-center gap-1 text-[10px] text-indigo-300"
                >
                  <MessageSquare size={10} />
                  {messageCount} {messageCount === 1 ? "message" : "messages"}
                </span>

                {conversationDate && (
                  <>
                    <span className="text-slate-700">·</span>

                    <span className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock size={10} />
                      {conversationDate}
                    </span>
                  </>
                )}
              </>
            ) : (
              <span className="text-[10px] text-slate-500">
                Your AI workspace
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* Model Selector */}
        <div className="relative">
          <motion.button
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setModelOpen(!modelOpen);
              setMoreOpen(false);
            }}
            className="h-10 px-2.5 sm:px-3 flex items-center gap-2
            rounded-xl border border-white/[0.08]
            bg-white/[0.04] text-slate-300
            transition-colors cursor-pointer"
          >
            <Bot size={17} className="text-indigo-400 shrink-0" />

            <span className="text-xs sm:text-sm font-medium">
              {selectedModel}
            </span>

            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200
              ${modelOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {modelOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-12 w-60 p-2
                rounded-xl border border-white/10
                bg-[#181b25] shadow-2xl shadow-black/40"
              >
                <p className="px-3 py-2 text-[10px] font-semibold
                uppercase tracking-wider text-slate-500">
                  Select AI Model
                </p>

                {models.map((model) => {
                  const Icon = model.icon;
                  const isSelected = selectedModel === model.name;

                  return (
                    <button
                      key={model.name}
                      onClick={() => {
                        setSelectedModel(model.name);
                        setModelOpen(false);
                      }}
                      className="w-full flex items-center gap-3
                      p-3 rounded-lg text-left
                      hover:bg-white/[0.06] transition-colors
                      cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg
                      bg-indigo-500/10 flex items-center justify-center">
                        <Icon size={16} className="text-indigo-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200">
                          {model.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {model.provider}
                        </p>
                      </div>

                      {isSelected && (
                        <Check size={16} className="text-indigo-400" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Share Current Page */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleShare}
          className="hidden sm:flex items-center gap-2
          h-10 px-3 rounded-xl
          border border-white/[0.08]
          bg-white/[0.04] text-slate-300
          hover:bg-white/[0.08] transition-colors cursor-pointer"
          title="Copy current page link"
        >
          {copied === "link" ? (
            <Check size={15} className="text-emerald-400" />
          ) : (
            <Share2 size={15} />
          )}

          <span className="text-sm font-medium">
            {copied === "link" ? "Copied" : "Share"}
          </span>
        </motion.button>

        {/* More Options */}
        <div className="relative">
          <motion.button
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              setMoreOpen(!moreOpen);
              setModelOpen(false);
            }}
            className="w-10 h-10 rounded-xl flex items-center
            justify-center text-slate-400
            hover:text-white transition-colors cursor-pointer"
            title="More options"
          >
            <MoreHorizontal size={20} />
          </motion.button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-12 w-52 p-2
                rounded-xl border border-white/10
                bg-[#181b25] shadow-2xl shadow-black/40"
              >
                <p className="px-3 py-2 text-[10px] font-semibold
                uppercase tracking-wider text-slate-500">
                  Conversation
                </p>

                <button
                  disabled={!selectedConversation?._id}
                  onClick={handleCopyId}
                  className="w-full flex items-center gap-3
                  px-3 py-2.5 rounded-lg text-sm text-slate-300
                  hover:bg-white/[0.06] transition-colors
                  disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copied === "id" ? (
                    <Check size={15} className="text-emerald-400" />
                  ) : (
                    <Copy size={15} />
                  )}

                  {copied === "id" ? "ID Copied" : "Copy conversation ID"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

export default Nav;
