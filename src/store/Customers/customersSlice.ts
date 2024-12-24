import { createSlice } from "@reduxjs/toolkit";
import {
    actGetCustomers,
    actGetFilteredCustomers,
    actEditCustomers,
} from "./act/actGetCustomers";
import { ICustomers, CustomerFilters } from "../../types/customers";

interface ICostomerState {
    customers: ICustomers[];
    totalPages: number;
    currentPage: number;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    currentFilters: CustomerFilters;
}

const initialState: ICostomerState = {
    customers: [],
    totalPages: 0,
    currentPage: 1,
    loading: "idle",
    error: null,
    currentFilters: {},
};

const customersSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
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
                state.currentFilters = {};
            })
            .addCase(actGetCustomers.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error as string;
            })
            .addCase(actGetFilteredCustomers.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.customers = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.currentFilters = action.payload.filters || {};
                state.currentPage = action.payload.current_page || 1;
            })
            .addCase(actGetFilteredCustomers.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            })
            .addCase(actEditCustomers.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actEditCustomers.fulfilled, (state, action) => {
                state.loading = "succeeded";
                const updatedCustomer = action.payload;
                state.customers = state.customers.map((customer) =>
                    customer.id === updatedCustomer.id
                        ? updatedCustomer
                        : customer
                );
            })
            .addCase(actEditCustomers.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPage, clearFilters } = customersSlice.actions;
export default customersSlice.reducer;
