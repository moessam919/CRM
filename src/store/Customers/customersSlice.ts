import { createSlice } from "@reduxjs/toolkit";
import { ICustomers } from "../../types/customers";
import { actGetCustomers, actGetSearchCustomers } from "./act/actGetCustomers";

interface ICostomerState {
    customers: ICustomers[];
    totalPages: number;
    currentPage: number;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICostomerState = {
    customers: [],
    totalPages: 0,
    currentPage: 1,
    loading: "idle",
    error: null,
};

const customersSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actGetCustomers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCustomers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.customers = action.payload.results;
            state.totalPages = action.payload.total_pages;
        });
        builder.addCase(actGetCustomers.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
        builder.addCase(actGetSearchCustomers.fulfilled, (state, action) => {
            state.customers = action.payload.results;
        });
    },
});

export const { setCurrentPage } = customersSlice.actions;
export default customersSlice.reducer;
