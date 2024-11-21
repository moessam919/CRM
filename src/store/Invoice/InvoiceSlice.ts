import { createSlice } from "@reduxjs/toolkit";
import { actGetLatestInvoices } from "./act/actGetInvoices";
import { Invoice } from "../../types/invoice";

interface IInvoiceState {
    invoices: Invoice[];
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}
const iniyialState: IInvoiceState = {
    invoices: [],
    loading: "idle",
    error: null,
};


const invoiceSlice = createSlice({
    name: "Invoice",
    initialState: iniyialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetLatestInvoices.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetLatestInvoices.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.invoices = action.payload;
        });
        builder.addCase(actGetLatestInvoices.rejected, (state, action) => {
            state.loading = "failed";
            state.error = action.error as string;
        });
    },
});

export default invoiceSlice.reducer;