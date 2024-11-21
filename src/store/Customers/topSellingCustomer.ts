import { createSlice } from "@reduxjs/toolkit";
import { actGetTopCustomers } from "./act/actGetCustomers";
import { ITopCustomer } from "../../types/TopCustomer";

interface ICostomerState {
    TopCustomers: ITopCustomer[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ICostomerState = {
    TopCustomers: [],
    loading: "idle",
    error: null,
};

const customersSlice = createSlice({
    name: "TopCustomer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetTopCustomers.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetTopCustomers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.TopCustomers = action.payload;
        });
        builder.addCase(actGetTopCustomers.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
    },
});

export default customersSlice.reducer;
