
import { useEffect, useState } from "react";

import {
  PanelLeftIcon,
  Plus,
  MessageSquare,
  Search,
  Settings,
  HelpCircle,
  Sparkles,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  addConversation,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationSlice";

import { createConversation } from "../features/createConversation";
import { getConversations } from "../features/getConversation";
import Profile from "./Profile";


function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  // Get conversation data from Redux
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation
  );
  const { userData } = useSelector(
    (state) => state.user
  );

  console.log("sidebar userdata",userData)
  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();

        const conversationList = Array.isArray(data)
          ? data
          : data?.conversations || [];

        dispatch(setConversations(conversationList));

        console.log("Conversations retrieved:", conversationList);
      } catch (error) {
        console.error("Error retrieving conversations:", error);
      }
    };

    fetchConversations();
  }, [userData, dispatch]);

  // Create a new conversation
  const handleCreateConversation = async () => {
    try {
      const data = await createConversation();

      const newConversation = data?.conversation || data;

      if (newConversation?._id) {
        // Add new conversation to Redux
        dispatch(addConversation(newConversation));

        // Automatically select the new conversation
        dispatch(setSelectedConversation(newConversation));

        console.log("New conversation selected:", newConversation);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  // Select conversation
  const handleSelectConversation = (chat) => {
    dispatch(setSelectedConversation(chat));

    console.log("Selected conversation:", chat);
  };

  return (
    <aside
      className={`
        ${collapsed ? "w-[76px]" : "w-[280px]"}
        h-full shrink-0
        bg-[#13151c]
        border-r border-white/[0.08]
        flex flex-col
        text-white
        transition-[width] duration-300 ease-in-out
        overflow-hidden
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center px-2" : "justify-between px-5"
        } py-5 border-b border-white/[0.06] shrink-0`}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="relative group">
              <button
                type="button"
                onClick={handleCreateConversation}
                aria-label="Create conversation"
                className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center hover:bg-indigo-500/25 transition-all duration-200 cursor-pointer"
              >
                <Sparkles
                  size={21}
                  className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                />
              </button>

              <span className="absolute left-1/2 -translate-x-1/2 top-full ml-8 mt-2 px-3 py-1.5 rounded-lg bg-[#252936] border border-white/10 text-xs font-medium text-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap pointer-events-none">
                Create New Conversation
              </span>
            </div>

            <h2 className="text-lg font-bold tracking-tight">
              Cortex<span className="text-indigo-400">AI</span>
            </h2>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <PanelLeftIcon size={20} />
        </button>
      </div>

      {/* New Chat */}
      <div className="p-4 shrink-0">
        <button
          type="button"
          title={collapsed ? "New Chat" : ""}
          onClick={handleCreateConversation}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3 px-4"}
            py-3 rounded-xl
            bg-indigo-500 hover:bg-indigo-600
            transition-colors cursor-pointer
          `}
        >
          <Plus size={19} className="shrink-0" />

          {!collapsed && (
            <span className="text-sm font-semibold whitespace-nowrap">
              New Chat
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-5 shrink-0">
        <button
          type="button"
          title={collapsed ? "Search conversations" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3 px-3"}
            py-2.5 rounded-lg
            bg-white/[0.04] border border-white/[0.06]
            text-slate-400 hover:text-white hover:bg-white/[0.08]
            transition-colors cursor-pointer
          `}
        >
          <Search size={17} className="shrink-0" />

          {!collapsed && (
            <span className="text-sm whitespace-nowrap">
              Search conversations
            </span>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="px-4 flex flex-col gap-2 shrink-0">
        {!collapsed && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Workspace
          </p>
        )}
      </div>

      {/* Recent Chats */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 mt-8">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between px-3"
          } mb-3`}
        >
          {!collapsed && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Recent Chats
            </p>
          )}

          <ChevronDown size={15} className="text-slate-500 shrink-0" />
        </div>

        <div className="flex flex-col gap-1">
          {conversations.length > 0 ? (
            conversations.map((chat) => {
              const isSelected =
                selectedConversation?._id === chat._id;

              return (
                <button
                  type="button"
                  key={chat._id}
                  onClick={() => handleSelectConversation(chat)}
                  aria-pressed={isSelected}
                  title={collapsed ? chat.title || "New" : ""}
                  className={`
                    group relative flex items-center
                    ${collapsed ? "justify-center" : "justify-between gap-2 px-3"}
                    py-2.5 rounded-lg
                    border-l-2
                    transition-all duration-200 ease-in-out
                    cursor-pointer

                    ${
                      isSelected
                        ? "bg-indigo-500/15 border-indigo-400 text-indigo-300 shadow-[inset_0_0_15px_rgba(99,102,241,0.08)]"
                        : "border-transparent text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  <div
                    className={`flex items-center ${
                      collapsed ? "justify-center" : "gap-3 min-w-0"
                    }`}
                  >
                    <MessageSquare
                      size={16}
                      className={`shrink-0 transition-colors duration-200 ${
                        isSelected
                          ? "text-indigo-400"
                          : "text-slate-400 group-hover:text-white"
                      }`}
                    />

                    {!collapsed && (
                      <span
                        className={`text-sm truncate transition-colors duration-200 ${
                          isSelected
                            ? "font-semibold text-indigo-300"
                            : ""
                        }`}
                      >
                        {chat.title || "New Chat"}
                      </span>
                    )}
                  </div>

                  {!collapsed && (
                    <MoreHorizontal
                      size={16}
                      className={`shrink-0 transition-opacity duration-200 ${
                        isSelected
                          ? "opacity-100 text-indigo-300"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  )}

                  {/* Selected indicator */}
                  {isSelected && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l-full bg-indigo-400" />
                  )}
                </button>
              );
            })
          ) : (
            !collapsed && (
              <p className="px-3 py-2 text-sm text-slate-500">
                No conversations found.
              </p>
            )
          )}
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-white/[0.06] shrink-0">
        <button
          type="button"
          title={collapsed ? "Settings" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3 px-3"}
            py-2.5 rounded-lg
            text-slate-400 hover:bg-white/[0.05]
            hover:text-white transition-colors cursor-pointer
          `}
        >
          <Settings size={18} className="shrink-0" />

          {!collapsed && <span className="text-sm">Settings</span>}
        </button>

        <button
          type="button"
          title={collapsed ? "Help & Support" : ""}
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3 px-3"}
            py-2.5 rounded-lg
            text-slate-400 hover:bg-white/[0.05]
            hover:text-white transition-colors cursor-pointer
          `}
        >
          <HelpCircle size={18} className="shrink-0" />

          {!collapsed && (
            <span className="text-sm">Help & Support</span>
          )}
        </button>

        {/* User Profile */}
      
{/* Current User Profile */}
  {/* User Profile */}
<div className="mt-3 pt-3 border-t border-white/[0.06]">
  <Profile collapsed={collapsed} />
</div>


      </div>
    </aside>
  );
}

export default Sidebar;
