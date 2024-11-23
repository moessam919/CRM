// src/redux/messageActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";
import { MessageData } from "../../../types/MessageData";

export const sendMessage = createAsyncThunk(
    "messages/sendMessage",
    async (messageData: MessageData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axiosInstance.post(
                "/crm/messages/",
                messageData
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data || "Error sending message"
                );
            } else {
                return rejectWithValue(
                    "An error occurred while sending the message."
                );
            }
        }
    }
);
