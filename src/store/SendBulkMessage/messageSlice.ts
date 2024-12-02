// src/redux/messageSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import {
    getMessage,
    getMessageDetails,
    sendBulkMessage,
    sendMessage,
} from "./act/actSendMessage";
import { Message, MessageData } from "../../types/MessageData";

interface MessageState {
    messages: Message[];
    messageDetails: Message | null;
    success: MessageData | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: MessageState = {
    messages: [],
    messageDetails: null,
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
        builder
            .addCase(getMessage.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.messages = action.payload;
            })
            .addCase(getMessage.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            })
            .addCase(getMessageDetails.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getMessageDetails.fulfilled, (state, action) => {
                state.messageDetails = action.payload;
                state.loading = "succeeded";
            })
            .addCase(getMessageDetails.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
        builder
            .addCase(sendBulkMessage.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(sendBulkMessage.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.success = action.payload;
            })
            .addCase(sendBulkMessage.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default messageSlice.reducer;
