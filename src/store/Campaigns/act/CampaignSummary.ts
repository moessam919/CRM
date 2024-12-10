// get status

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

export const actgetCampaignSummary = createAsyncThunk(
    "campaigns/actgetCampaignSummary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/marketing/campaigns/summary/`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue(
                "An error occurred while fetching the campaign status."
            );
        }
    }
);
