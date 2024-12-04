import { createSlice } from "@reduxjs/toolkit";
import { createCampaign } from "./act/CampaignActions";

interface Campaign {
    id: number;
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

interface CampaignState {
    campaigns: Campaign[];
    loading: boolean;
    error: string | null;
}

const initialState: CampaignState = {
    campaigns: [],
    loading: false,
    error: null,
};

const campaignSlice = createSlice({
    name: "campaign",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCampaign.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.loading = false;
                state.campaigns.push(action.payload);
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default campaignSlice.reducer;
