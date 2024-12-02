import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

export const actGetCustomer = createAsyncThunk(
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

export const actGetCustomerMessages = createAsyncThunk(
    "Customer/actGetCustomerMessages)",
    async (id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(`crm/messages/${id}/customer`);
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

export const actGetCustomerNote = createAsyncThunk(
    "CustomerNote/actGetCustomerNote)",
    async (id: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(`crm/notes/customer/${id}`);
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

export const actCreateCustomerNote = createAsyncThunk(
    "CreateCustomerNote/actCreateCustomerNote",
    async (
        { id, note }: { id: number | undefined; note: string },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.post(`crm/notes`, {
                customer: id,
                note: note,
            });
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while creating the customer note."
                );
            }
        }
    }
);
