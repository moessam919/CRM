import { configureStore } from "@reduxjs/toolkit";
import salesreport from "./SalesReport/salesreportSlice";
import Customers from "./Customers/customersSlice";
import Customer from "./Customer/customerSlice";
import cutsomerNote from "./Customer/customerNoteSlice";
import createCustomerNote from "./Customer/createCustomerNote";

export const store = configureStore({
    reducer: {
        salesreport,
        Customers,
        Customer,
        cutsomerNote,
        createCustomerNote,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
