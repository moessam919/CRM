import { createSlice } from "@reduxjs/toolkit";
import { CampaignSummary } from "./type/CampaignType";
import { actgetCampaignSummary } from "./act/CampaignSummary";

interface CampaignsState {
    campaignSummary: CampaignSummary | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CampaignsState = {
    campaignSummary: null,
    loading: "idle",
    error: null,
};

const campaignsSlice = createSlice({
    name: "campaigns",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Handle fetchCampaignSummary
            .addCase(actgetCampaignSummary.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actgetCampaignSummary.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.campaignSummary = action.payload;
            })
            .addCase(actgetCampaignSummary.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default campaignsSlice.reducer;
