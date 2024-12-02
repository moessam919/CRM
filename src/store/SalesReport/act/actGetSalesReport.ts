import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../API/axiosInstance";

const actGetSalesReport = createAsyncThunk(
    "salesreport/getSalesreport",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get("crm/sales-report");
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching data."
                );
            }
        }
    }
);

export default actGetSalesReport;
