import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

const actGetCustomer = createAsyncThunk(
    "Customer/actGetCustomer",
    async (id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(`crm/customers/${id}`);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching the customer."
                );
            }
        }
    }
);

export default actGetCustomer;
