import { createSlice } from "@reduxjs/toolkit";
import { actCreateCustomerNote } from "./act/actGetCustomer";

interface ICreateCustomerNoteState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | { message: string } | null;
}

const initialState: ICreateCustomerNoteState = {
    loading: "idle",
    error: null,
};

const createCustomerNoteSlice = createSlice({
    name: "CreateCustomerNote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actCreateCustomerNote.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actCreateCustomerNote.fulfilled, (state) => {
            state.loading = "succeeded";
        });
        builder.addCase(actCreateCustomerNote.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        });
    },
});

export default createCustomerNoteSlice.reducer;
