import { createSlice } from "@reduxjs/toolkit";
import { ISalesReport } from "../../types/salesreport";
import actGetSalesReport from "./act/actGetSalesReport";

interface ISalesreportState {
    salesreport: ISalesReport | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ISalesreportState = {
    salesreport: null,
    loading: "idle",
    error: null,
};

const salesreportSlice = createSlice({
    name: "salesreport",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetSalesReport.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetSalesReport.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.salesreport = action.payload;
        });
        builder.addCase(actGetSalesReport.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
    },
});

export { actGetSalesReport };
export default salesreportSlice.reducer;
