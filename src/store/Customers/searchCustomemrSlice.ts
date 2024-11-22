import { createSlice } from "@reduxjs/toolkit";
import { ICustomers, CustomerFilters } from "../../types/customers";
import { actGetCustomers, actGetSearchCustomers } from "./act/actGetCustomers";

interface ICostomerState {
    customers: ICustomers[];
    totalPages: number;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    currentFilters: CustomerFilters;
}

const initialState: ICostomerState = {
    customers: [],
    totalPages: 0,
    loading: "idle",
    error: null,
    currentFilters: {},
};

const searchCustomemrSlice = createSlice({
    name: "searchCustomemr",
    initialState,
    reducers: {
        clearFilters: (state) => {
            state.currentFilters = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(actGetCustomers.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actGetCustomers.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.customers = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(actGetCustomers.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error as string;
            })
            .addCase(actGetSearchCustomers.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.customers = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.currentFilters = action.payload.filters || {};
            })
            .addCase(actGetSearchCustomers.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { clearFilters } = searchCustomemrSlice.actions;
export default searchCustomemrSlice.reducer;
