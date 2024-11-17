// src/store/slices/customerSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import actGetCustomer from "./act/actGetCustomer"; // Import the action
import { ICustomer } from "../../types/customer";

// Define the structure of the customer state
interface ICustomerState {
    customer: ICustomer | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICustomerState = {
    customer: null,
    loading: "idle",
    error: null,
};

const customerSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetCustomer.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCustomer.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.customer = action.payload;
        });
        builder.addCase(actGetCustomer.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message || "Failed to load customer";
        });
    },
});

export default customerSlice.reducer;
