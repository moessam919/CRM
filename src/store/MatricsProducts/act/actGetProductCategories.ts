import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

export const actGetProductCategories = createAsyncThunk(
    "productCategory/actGetProductCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/product_category`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue(
                    "An error occurred while fetching the products."
                );
            }
        }
    }
);
