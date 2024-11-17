import { createSlice } from "@reduxjs/toolkit";
import { ICustomers } from "../../types/customers";
import actGetCustomers from "./act/actGetCustomers";

interface ICostomerState {
    customers: ICustomers[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICostomerState = {
    customers: [],
    loading: "idle",
    error: null,
};

const customersSlice = createSlice({
    name: "Customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetCustomers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCustomers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.customers = action.payload;
        });
        builder.addCase(actGetCustomers.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
    },
});

export default customersSlice.reducer;
