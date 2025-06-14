import { createSlice } from "@reduxjs/toolkit";
import { deleteBlog, getBlogs, myBlogs, postBlog, singleBlog, updateBlog } from "../action/blog.action.js";

const initialState = {
    blogs: [],
    suggestBlogs: [],
    myBlog: [],
    status: null,
    error: null,
    message: null,
    blogCount: 0,
    resultPerPage: 0
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Find  All blogs ->
            .addCase(getBlogs.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(getBlogs.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.blogs = action.payload.blogs, state.resultPerPage = action.payload.resultPerPage, state.blogCount = action.payload.blogCount })
            .addCase(getBlogs.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            //  single blog with suggestion -> 
            .addCase(singleBlog.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(singleBlog.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.blogs = action.payload.data?.blog, state.suggestBlogs = action.payload.data?.suggestedBlogs })
            .addCase(singleBlog.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // user's Posted Blogs -> 
            .addCase(myBlogs.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(myBlogs.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.myBlog = action.payload.data })
            .addCase(myBlogs.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // Create Blog -> 
            .addCase(postBlog.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(postBlog.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.message = action.payload.message })
            .addCase(postBlog.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // update blog -> 
            .addCase(updateBlog.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(updateBlog.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.blogs = action.payload.data })
            .addCase(updateBlog.rejected, (state, action) => { state.status = "error", state.error = action.payload })


            // Delete blog ->  
            .addCase(deleteBlog.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(deleteBlog.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.blogs = state.blogs.filter((item) => item.id !== action.payload.id, state.blogCount = state.blogCount - 1) })
            .addCase(deleteBlog.rejected, (state, action) => { state.status = "error", state.error = action.payload })

    }
})

export default blogSlice.reducer;

