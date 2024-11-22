import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";
import { CustomerFilters } from "../../../types/customers";

export const actGetCustomers = createAsyncThunk(
    "Customer/actGetCustomers",
    async (pageNumber: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(
                `crm/customers/?page=${pageNumber || 1}`
            );
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

export const actGetFilteredCustomers = createAsyncThunk(
    "Customer/actGetFilteredCustomers",
    async (
        {
            filters,
            pageNumber = 1,
        }: {
            filters: CustomerFilters;
            pageNumber?: number;
        },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            // Convert filters to query string
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    queryParams.append(key, value.toString());
                }
            });

            const res = await axiosInstance.get(
                `crm/customers/?${queryParams.toString()}&page=${pageNumber}`
            );
            return {
                ...res.data,
                filters, 
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching filtered data."
                );
            }
        }
    }
);

export const actGetSearchCustomers = createAsyncThunk(
    "searchCustomemr/actGetSearchCustomers",
    async (
        {
            filters,
        }: {
            filters: CustomerFilters;
        },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            // Convert filters to query string
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    queryParams.append(key, value.toString());
                }
            });

            const res = await axiosInstance.get(
                `crm/customers/?${queryParams.toString()}`
            );
            return {
                ...res.data,
                filters,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching filtered data."
                );
            }
        }
    }
);

export const actGetTopCustomers = createAsyncThunk(
    "TopCustomer/actGetTopCustomers",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get("crm/customers/top");
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
