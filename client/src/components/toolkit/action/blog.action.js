import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/apiAccessPoint";

// fatch all blogs - 
export const getBlogs = createAsyncThunk("/blog", async (arg = {}, { rejectWithValue }) => {
    const { keyword = "", currentPage = 1 } = arg;
    let query = `/view-blogs?keyword=${keyword}&page=${currentPage}`
    try {
        const { data } = await api.get(query);
        return data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

// user see own posted blog*
export const myBlogs = createAsyncThunk("/my-blogs", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/my-blog");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

// single blog with sujjested blogs
export const singleBlog = createAsyncThunk("/single/blogs", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/view-blog/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

// update blog -
export const updateBlog = createAsyncThunk("/update/blogs", async (updateData = {}, { rejectWithValue }) => {
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await api.put(`/blog/${updateData.id}`, updateData.blogData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

//delete blog -
export const deleteBlog = createAsyncThunk("/delete/blogs", async (id, { rejectWithValue }) => {
    try {
        const { data } = await api.delete(`/blog/${id}`);

        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error);
    }
});

// post blog with category - 
export const postBlog = createAsyncThunk('/post/blog', async (blogData = {}, { rejectWithValue }) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const { data } = await api.post('/blogs', blogData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message,);
    }
}
);

