import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAccessPoint";

// ✅ Fetch All Categories
export const getCategories = createAsyncThunk("/categories", async (query = {}, { rejectWithValue }) => {
    const { currentPage = 1, keyword = "" } = query;
    try {
        const { data } = await api.get(`/admin/category?keyword=${keyword}&page=${currentPage}`);
        return data.data; // assuming your backend returns { data: {...actualData} }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// ✅ Add Category
export const addCategories = createAsyncThunk("/add/categories", async (category = {}, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await api.post("/admin/category", category, config);
        return data; // should contain success + message + new category data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// ✅ View Single Category
export const getCategory = createAsyncThunk("/view/categories", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/admin/category/${id}`);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// ✅ Update Category
export const updateCategories = createAsyncThunk("/update/categories", async (formData = {}, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await api.put(`/admin/category/${formData.id}`, formData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});

// ✅ Delete Category
export const deleteCategories = createAsyncThunk("/delete/categories", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/admin/category/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || "Something went wrong");
    }
});
