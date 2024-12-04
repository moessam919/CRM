import axios from "axios";
import axiosInstance from "../../../API/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface CampaignPayload {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    metrics: {
        name: string;
        type: string;
        value: string;
        additional_fields: {
            products?: number[];
            categories?: number[];
        };
    }[];
    comparison_periods?: {
        start_date: string;
        end_date: string;
    }[];
}

export const createCampaign = createAsyncThunk(
    "campaign/create",
    async (payload: CampaignPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/marketing/campaigns/",
                payload
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching the products."
                );
            }
        }
    }
);
