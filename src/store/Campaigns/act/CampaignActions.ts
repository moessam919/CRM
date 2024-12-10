import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";
import { Campaign, selectedCampaign } from "../type/CampaignType";

// get Campaigns
export const actgetCampaigns = createAsyncThunk(
    "campaigns/actgetCampaigns",
    async (searchTerm: string = "", { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<Campaign[]>(
                `/marketing/campaigns/${searchTerm ? `?q=${searchTerm}` : ""}`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue(
                "An error occurred while fetching the campaigns."
            );
        }
    }
);

export const actgetCampaignById = createAsyncThunk(
    "campaigns/actgetCampaignById",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<selectedCampaign[]>(
                `/marketing/campaigns/${id}/`
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue(
                "An error occurred while fetching the campaign details."
            );
        }
    }
);

export const actGetCampaignChartData = createAsyncThunk(
    "campaigns/actGetCampaignChartData",
    async (
        { period, id }: { period: string; id: string | undefined },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(
                `/marketing/campaigns/${id}/daily-performance/?${new URLSearchParams({ period: `${period}` })}`
            );
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching data."
                );
            }
        }
    }
);
