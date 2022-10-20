import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatService from "../api/ChatService";

const initialState = {
  isLoading: false,
  error: undefined,
  messages: [],
  chat: undefined,
};

export const getActiveChat = createAsyncThunk(
  "getActiveChat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ChatService.getActiveChat();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMessagesByChat = createAsyncThunk(
  "getMessagesByChat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await ChatService.getMessagesByChat(payload.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getActiveChat.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getActiveChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.chat = action.payload;
      })
      .addCase(getActiveChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getMessagesByChat.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getMessagesByChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.messages = action.payload;
      })
      .addCase(getMessagesByChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const useChat = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state) => state.chat);
  const actions = useMemo(
    () => ({
      getActiveChat: () => dispatch(getActiveChat()),
      getMessagesByChat: (payload) => dispatch(getMessagesByChat(payload)),
    }),
    [dispatch]
  );

  return [chatState, actions];
};

export default chatSlice.reducer;
