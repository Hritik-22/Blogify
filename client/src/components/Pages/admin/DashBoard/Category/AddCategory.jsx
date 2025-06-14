import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCategories } from '../../../../toolkit/action/CategoriesAction';
import { toast } from 'react-toastify';
import { Meta, useNavigate } from 'react-router-dom';
import MetaData from '../../../../meta/MetaData';


const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(addCategories({ category }));
            if (res.payload?.success === true) {
                toast.success(res.payload.message);
                navigate("/dashboard/all-categories")

            } else {
                toast.error(res.payload?.message || "Something went wrong");
            }
        } catch (err) {
            toast.error("Unexpected error occurred");
            console.error(err);
        }
    };


    return (
        <Box
            height="80vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f5f5f5"
        >
            <MetaData title={"add-category"} />
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Create Category
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        variant="outlined"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Add Category
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddCategory;
