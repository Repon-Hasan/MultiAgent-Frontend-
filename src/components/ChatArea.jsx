
import { useEffect } from "react";
import Nav from "./Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessage.js";
import { setMessages } from "../redux/messageSlice.js";
import MessagesList from "./MessagesList.jsx";
import ChatInput from "./ChatInput.jsx";

function ChatArea() {
  const { selectedConversation } = useSelector(
    (state) => state.conversation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation?._id) {
        dispatch(setMessages([]));
        return;
      }

      dispatch(setMessages([]));

      const data = await getMessages(selectedConversation._id);
      dispatch(setMessages(data || []));
    };

    fetchMessages();
  }, [dispatch, selectedConversation?._id]);

  return (
    <div className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden gap-5 p-5">
      <Nav />

      <MessagesList />

      <ChatInput />
    </div>
  );
}

export default ChatArea;
