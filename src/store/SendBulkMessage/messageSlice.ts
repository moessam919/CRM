// src/redux/messageSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { sendMessage } from "./act/actSendMessage";
import { MessageData } from "../../types/MessageData";

interface MessageState {
    success: MessageData | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: MessageState = {
    success: null,
    loading: "idle",
    error: null,
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.success = action.payload;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default messageSlice.reducer;
