import { createSlice } from "@reduxjs/toolkit";
import { ISalesChartData } from "../../types/salesChartData";
import { actGetChartData } from "./act/actGetSalesChartData";

interface ISalesChart {
    data: ISalesChartData | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}
const iniyialState: ISalesChart = {
    data: null,
    loading: "idle",
    error: null,
};

const SalesChart = createSlice({
    name: "SalesChartData",
    initialState: iniyialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetChartData.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetChartData.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(actGetChartData.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
    },
});

export default SalesChart.reducer;
