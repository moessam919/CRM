import { createSlice } from "@reduxjs/toolkit";
import {
    Campaign,
    ChartDataPoint,
    selectedCampaign,
} from "./type/CampaignType";
import {
    actgetCampaigns,
    actgetCampaignById,
    actGetCampaignChartData,
    actDeleteCampaign,
    actUpdateCampaignStatus,
} from "./act/CampaignActions";

interface CampaignsState {
    campaigns: Campaign[];
    selectedCampaign: selectedCampaign | null;
    data: ChartDataPoint | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CampaignsState = {
    campaigns: [],
    selectedCampaign: null,
    data: null,
    loading: "idle",
    error: null,
};

const campaignsSlice = createSlice({
    name: "campaigns",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchCampaigns
            .addCase(actgetCampaigns.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actgetCampaigns.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.campaigns = action.payload;
            })
            .addCase(actgetCampaigns.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            })
            // Handle fetchCampaignById
            .addCase(actgetCampaignById.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actgetCampaignById.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.selectedCampaign = Array.isArray(action.payload)
                    ? action.payload[0]
                    : action.payload;
            })
            .addCase(actgetCampaignById.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            })
            // handle CampaignChartData
            .addCase(actGetCampaignChartData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(actGetCampaignChartData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error as string;
            })
            // Handle Delete Campaign
            .addCase(actDeleteCampaign.fulfilled, (state, action) => {
                state.campaigns = state.campaigns.filter(
                    (campaign) =>
                        campaign.id.toString() !== action.payload.toString()
                );
                state.selectedCampaign = null;
            })
            .addCase(actDeleteCampaign.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            // Handle Update Campaign Status
            .addCase(actUpdateCampaignStatus.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(actUpdateCampaignStatus.fulfilled, (state, action) => {
                state.loading = "succeeded";

                // Update in campaigns list
                const index = state.campaigns.findIndex(
                    (campaign) => campaign.id === action.payload.id
                );
                if (index !== -1) {
                    state.campaigns[index] = action.payload;
                }

                // Update selected campaign
                if (state.selectedCampaign?.id === action.payload.id) {
                    state.selectedCampaign = action.payload;
                }
            })
            .addCase(actUpdateCampaignStatus.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default campaignsSlice.reducer;
