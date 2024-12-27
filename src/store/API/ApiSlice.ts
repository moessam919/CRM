import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./act/actGetCheckAuth";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        user: string;
    } | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: "idle",
    error: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            })
            // login cases
            .addCase(login.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = "succeeded";
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default AuthSlice.reducer;
