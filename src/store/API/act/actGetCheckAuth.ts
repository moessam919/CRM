import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";
import axios from "axios";

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/check_auth");
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

// Helper function to clear all cookies
const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logout", null, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                        /=.*/,
                        "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
            });

            clearAllCookies();

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue("An error occurred during logout.");
        }
    }
);
