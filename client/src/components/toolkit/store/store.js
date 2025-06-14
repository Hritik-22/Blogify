import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slice/authSlice.js"
import blogReducer from "../slice/blog.slice.js"
import categoriesReducer from "../slice/categoriesSlice.js"
import usersReducers from "../slice/userSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        category: categoriesReducer,
        users: usersReducers
    },
})

export default store;