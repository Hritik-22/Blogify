import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, userLogout, userProfile, changePassword, updateUserProfile, contact } from "../action/authAction";

const initialState = {
    user: [],
    status: null,
    isAuthenticated: false,
    error: null,
    message: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // register User -
            .addCase(registerUser.pending, (state) => { state.status = "loading" })
            .addCase(registerUser.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.user = action.payload.user })
            .addCase(registerUser.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // Login User -
            .addCase(loginUser.pending, (state) => { state.status = "loading", state.error = null })
            .addCase(loginUser.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.isAuthenticated = true, state.user = action.payload.data })
            .addCase(loginUser.rejected, (state, action) => { state.status = "error", state.isAuthenticated = false, state.error = action.payload })


            // logout User
            .addCase(userLogout.pending, (state) => { state.status = "loading" })
            .addCase(userLogout.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.isAuthenticated = false })
            .addCase(userLogout.rejected, (state, action) => { state.status = "error", state.error = action.payload, state.isAuthenticated = true })


            // user Profile -  

            .addCase(userProfile.pending, (state) => { state.status = "loading", state.isAuthenticated = false })
            .addCase(userProfile.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.isAuthenticated = true, state.user = action.payload.data })
            .addCase(userProfile.rejected, (state, action) => { state.status = "error", state.isAuthenticated = false, state.error = null })

            // update User Password  -
            .addCase(changePassword.pending, (state,) => { state.status = "loading" })
            .addCase(changePassword.fulfilled, (state, action) => { state.status = "updated", state.error = null, state.isAuthenticated = true, state.message = action.payload })
            .addCase(changePassword.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // update User Profile  -
            .addCase(updateUserProfile.pending, (state,) => { state.status = "loading" })
            .addCase(updateUserProfile.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.isAuthenticated = true, state.user = action.payload.data })
            .addCase(updateUserProfile.rejected, (state, action) => { state.status = "error", state.error = action.payload })

            // req a call || contact -
            .addCase(contact.pending, (state,) => { state.status = "loading" })
            .addCase(contact.fulfilled, (state, action) => { state.status = "idle", state.error = null, state.isAuthenticated = true, state.user = action.payload.data })
            .addCase(contact.rejected, (state, action) => { state.status = "error", state.error = action.payload })
    }
})

export default authSlice.reducer;








