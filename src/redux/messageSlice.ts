
import { createSlice } from "@reduxjs/toolkit";

type Message = {
  id: string | number;
  content: string;
};

const messageSlice = createSlice({
  name: "message",

  initialState: {
    messages: [] as Message[],
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    updateMessage: (state, action) => {
      const { id, content } = action.payload;

      const message = state.messages.find(
        (item) => item.id === id
      );

      if (message) {
        message.content = content;
      }
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
