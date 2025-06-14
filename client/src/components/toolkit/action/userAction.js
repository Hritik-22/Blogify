import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAccessPoint";


// Get users - 

export const getAllUsers = createAsyncThunk("/users", async (query = {}, { rejectWithValue }) => {
    const { currentPage = 1, keyword = "" } = query;
    try {
        const { data } = await api.get(`/users?keyword=${keyword}&page=${currentPage}`);
        return data.data; // assuming your backend returns { data: {...actualData} }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// get Single User -

export const getSingleUser = createAsyncThunk("/single/user", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/user/${id}`);

        return data.users;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// delete User - 

export const deleteUser = createAsyncThunk("/delete/user", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/user/${id}`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

//  Update user - 

export const updateUser = createAsyncThunk("/update/user", async (updatedData = {}, { rejectWithValue }) => {
    const { id, formData } = updatedData;
    try {
        const { data } = await api.patch(`/user/${id}`, formData);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});


// see Queris contact Page - 

export const getAllQueries = createAsyncThunk("/queries/users", async (query = {}, { rejectWithValue }) => {
    const { keyword = "", currentPage = 1 } = query;
    try {
        const { data } = await api.get(`/contact?keyword=${keyword}&page=${currentPage}`);
        return data.data;
    } catch (error) {

        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});
export const getSingalQuery = createAsyncThunk("/queries/single/user", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/contact/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

export const updateQuerie = createAsyncThunk("/update/queries", async (updatedData = {}, { rejectWithValue }) => {
    const { id, formData } = updatedData;
    console.log(id, formData)
    try {
        const { data } = await api.patch(`/contact/${id}`, formData);
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

