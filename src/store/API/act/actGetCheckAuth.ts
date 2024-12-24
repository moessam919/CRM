import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/check_auth");
            console.log("response.data", response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    return rejectWithValue("User not authenticated");
                }
                return rejectWithValue("Failed to check authentication");
            }
        }
    }
);

interface LoginCredentials {
    username: string;
    password: string;
}

export const login = createAsyncThunk(
    "auth/login",
    async (
        formData: LoginCredentials,

        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue(
                "An error occurred while fetching the campaigns."
            );
        }
    }
);
