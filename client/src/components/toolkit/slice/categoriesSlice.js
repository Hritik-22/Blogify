import { createSlice } from "@reduxjs/toolkit";
import { addCategories, deleteCategories, getCategories, getCategory, updateCategories } from "../action/CategoriesAction.js";


const initialState = {
    categories: [],
    categoryCount: 0,
    resultPerPage: 0,
    status: null,
    error: null,
}

const categoriesSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get Categories - 
            .addCase(getCategories.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(getCategories.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.categories = action.payload?.data, state.categoryCount = action.payload?.categoryCount, state.resultPerPage = action.payload?.resultPerPage })
            .addCase(getCategories.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // Create Categories -

            .addCase(addCategories.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(addCategories.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.categories.push(action.payload?.data); })
            .addCase(addCategories.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })

            // view Category single -
            .addCase(getCategory.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(getCategory.fulfilled, (state, action) => { state.status = "idle"; state.error = null; })
            .addCase(getCategory.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })

            // Update Category  -
            .addCase(updateCategories.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(updateCategories.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.categories = action.payload })
            .addCase(updateCategories.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })
            // delete Category  -
            .addCase(deleteCategories.pending, (state) => { state.status = "loading"; state.error = null; })
            .addCase(deleteCategories.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.categories = state.categories.filter((item) => item.id !== action.payload.data.id) })
            .addCase(deleteCategories.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })
    }
});

export default categoriesSlice.reducer;