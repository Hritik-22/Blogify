import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCategory, updateCategories } from '../../../../toolkit/action/CategoriesAction';
import { toast } from 'react-toastify';
import MetaData from '../../../../meta/MetaData';

const UpdateCategory = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    useEffect(() => {
        dispatch(getCategory(id)).then(res => setCategory(res.payload.category))
    }, [dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategories({ id, category })).then(res => {
            if (res.payload.success) {
                toast.success(res.payload.message)
                navigate("/dashboard/all-categories")


            }
        })
    };

    return (
        <Box
            height="80vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f5f5f5"
        >
            <MetaData title={"update category"} />
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
                    Update Category
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth

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
                        Update Category
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default UpdateCategory;





