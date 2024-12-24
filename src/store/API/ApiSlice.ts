import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: "idle",
    error: null,
};

const ApiSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("access_token");
        },
    },
});

export const { logout } = ApiSlice.actions;
export default ApiSlice.reducer;
