// src/store/slices/customerSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { actGetCustomer, actGetCustomerMessages } from "./act/actGetCustomer"; // Import the action
import { ICustomer, ICustomerMessage } from "../../types/customer";

// Define the structure of the customer state
interface ICustomerState {
    customer: ICustomer | null;
    messages: ICustomerMessage[] | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    loadingMessages: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    errorMessages: string | null;
}

const initialState: ICustomerState = {
    customer: null,
    messages: null,
    loadingMessages: "idle",
    loading: "idle",
    error: null,
    errorMessages: null,
};

const customerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actGetCustomer.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(actGetCustomer.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.customer = action.payload;
            })
            .addCase(actGetCustomer.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message || "Failed to load customer";
            });
        builder
            .addCase(actGetCustomerMessages.pending, (state) => {
                state.loadingMessages = "pending";
                state.errorMessages = null;
            })
            .addCase(actGetCustomerMessages.fulfilled, (state, action) => {
                state.loadingMessages = "succeeded";
                state.messages = action.payload;
            })
            .addCase(actGetCustomerMessages.rejected, (state, action) => {
                state.loadingMessages = "failed";
                state.errorMessages =
                    action.error.message || "Failed to load customer";
            });
    },
});

export default customerSlice.reducer;
