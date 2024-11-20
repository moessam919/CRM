// src/store/slices/customerSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { actGetCustomerNote } from "./act/actGetCustomer"; // Import the action
import { ICustomerNote } from "../../types/customerNote";

// Define the structure of the customer state
interface ICustomerState {
    customerNote: ICustomerNote[] | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICustomerState = {
    customerNote: null,
    loading: "idle",
    error: null,
};

const customerSlice = createSlice({
    name: "CustomerNote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetCustomerNote.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCustomerNote.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.customerNote = action.payload;
        });
        builder.addCase(actGetCustomerNote.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error.message || "Failed to load customer";
        });
    },
});

export default customerSlice.reducer;
