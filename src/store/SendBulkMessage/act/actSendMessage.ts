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

export const getMessage = createAsyncThunk(
    "messages/getMessage",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axiosInstance.get(`/crm/messages/`);
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

export const getMessageDetails = createAsyncThunk(
    "messages/getMessageDetails",
    async (id: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const response = await axiosInstance.get(`/crm/messages/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data || "Error fetching message details"
                );
            } else {
                return rejectWithValue(
                    "An error occurred while fetching the message details."
                );
            }
        }
    }
);
