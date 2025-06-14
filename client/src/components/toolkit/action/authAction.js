import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAccessPoint.js"

export const registerUser = createAsyncThunk("/auth/reg", async (formData, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await api.post("/register", formData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

export const loginUser = createAsyncThunk("auth/loginUSer", async (user, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/login", user);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

export const userProfile = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("user/me");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const userLogout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/logout");
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)

    }
});

// update Password
export const changePassword = createAsyncThunk("auth/change/password", async (updatePassword, { rejectWithValue }) => {
    try {

        const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await api.put("/password/change", updatePassword, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)

    }
});

// update profile  - 
export const updateUserProfile = createAsyncThunk("auth/update/profile", async (formData, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await api.put("/user", formData, config);
        return data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || error.message) }
});

// contact - req a call;
export const contact = createAsyncThunk("/contact", async (contactData, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await api.post("/contact", contactData, config);
        return data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || error.message) }
});
