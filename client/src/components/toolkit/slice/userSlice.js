import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllQueries, getAllUsers, getSingalQuery, getSingleUser, updateQuerie, updateUser } from "../action/userAction";



const initialState = {
    users: [],
    queries: [],
    resultPerPage: 0,
    usersCount: 0,
    status: null,
    error: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //    get all users
            .addCase(getAllUsers.pending, (state) => { state.status = "loading" })
            .addCase(getAllUsers.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.users = action.payload?.data; state.usersCount = action.payload?.userCount; state.resultPerPage = action.payload?.resultPerPage; })
            .addCase(getAllUsers.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })

            // get Single User - 
            .addCase(getSingleUser.pending, (state) => { state.status = "loading" })
            .addCase(getSingleUser.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.users = action.payload; })
            .addCase(getSingleUser.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })


            //  delete users - 
            .addCase(deleteUser.pending, (state) => { state.status = "loading" })
            .addCase(deleteUser.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.users = state.users.filter((item) => item.id !== action.payload?.data?.id) })
            .addCase(deleteUser.rejected, (state, action) => { state.status = "error"; state.error = action.payload })

            //    Update user -
            .addCase(updateUser.pending, (state) => { state.status = "loading" })
            .addCase(updateUser.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.users = action.payload })
            .addCase(updateUser.rejected, (state, action) => { state.status = "error"; state.error = action.payload })


            // get List queries  - 

            .addCase(getAllQueries.pending, (state) => { state.status = "loading" })
            .addCase(getAllQueries.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.queries = action.payload })
            .addCase(getAllQueries.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })

            // get Single query -  

            .addCase(getSingalQuery.pending, (state) => { state.status = "loading" })
            .addCase(getSingalQuery.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.queries.data = action.payload.data })
            .addCase(getSingalQuery.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })

            // Update query - 
            .addCase(updateQuerie.pending, (state) => { state.status = "loading" })
            .addCase(updateQuerie.fulfilled, (state, action) => { state.status = "idle"; state.error = null; state.queries = action.payload })
            .addCase(updateQuerie.rejected, (state, action) => { state.status = "error"; state.error = action.payload; })



    }
})
export default usersSlice.reducer;