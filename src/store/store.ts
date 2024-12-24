import { configureStore } from "@reduxjs/toolkit";
import salesreport from "./SalesReport/salesreportSlice";
import Customers from "./Customers/customersSlice";
import Customer from "./Customer/customerSlice";
import cutsomerNote from "./Customer/customerNoteSlice";
import createCustomerNote from "./Customer/createCustomerNote";
import TopCustomers from "./Customers/topSellingCustomer";
import Invoice from "./Invoice/InvoiceSlice";
import SalesChart from "./SalesChartData/SalesChartSlice";
import searchCustomer from "./Customers/searchCustomemrSlice";
import Message from "./SendBulkMessage/messageSlice";
import products from "./MatricsProducts/ProductsSlice";
import productCategories from "./MatricsProducts/ProductCategorySlice";
import campaign from "./MatricsProducts/CampaignSlice";
import campaigns from "./Campaigns/CampaignsSlice";
import campaignSummary from "./Campaigns/CampaignsSummarySlice";
import ApiSlice from "./API/ApiSlice";
export const store = configureStore({
    reducer: {
        salesreport,
        Customers,
        Customer,
        cutsomerNote,
        createCustomerNote,
        TopCustomers,
        Invoice,
        SalesChart,
        searchCustomer,
        Message,
        products,
        productCategories,
        campaign,
        campaigns,
        campaignSummary,
        ApiSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
