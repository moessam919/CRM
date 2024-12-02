import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";
import { CustomerFilters, ICustomers } from "../../../types/customers";

export const actGetCustomers = createAsyncThunk(
    "Customer/actGetCustomers",
    async (pageNumber: number, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.get(
                `crm/customers?page=${pageNumber || 1}`
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
            pageNumber,
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
                `crm/customers?${queryParams.toString()}&page=${pageNumber}`
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
                `crm/customers?${queryParams.toString()}`
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

export const actEditCustomers = createAsyncThunk(
    "Customer/actEditCustomers",
    async (
        {
            id,
            updatedCustomer,
        }: {
            id: number;
            updatedCustomer: ICustomers;
        },
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const res = await axiosInstance.put(
                `crm/customers/${id}/update`,
                updatedCustomer
            );
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while updating the customer."
                );
            }
        }
    }
);

export const actExportCustomers = createAsyncThunk(
    "Customer/actExportCustomers",
    async (
        {
            filters,
        }: {
            filters?: CustomerFilters;
        } = {},
        thunkAPI
    ) => {
        const { rejectWithValue } = thunkAPI;
        try {
            // Convert filters to query string
            const queryParams = new URLSearchParams();
            if (filters) {
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        queryParams.append(key, value.toString());
                    }
                });
            }
            const url = `crm/customers?export=excel&${queryParams.toString()}`;
            const res = await axiosInstance.get(url, {
                responseType: "blob",
            });

            // Create a file download link
            const downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(res.data);
            downloadLink.setAttribute("download", "customers_export.xlsx");
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            return { message: "Export successful" };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while exporting data."
                );
            }
        }
    }
);
