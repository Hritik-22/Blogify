import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../toolkit/action/CategoriesAction';
import { postBlog , getBlogs } from '../../../toolkit/action/blog.action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const CreateBlog = () => {
    const { categories } = useSelector(state => state.category);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => { dispatch(getCategories()) }, [dispatch])


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: null,
        preview: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(file),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const blogData = new FormData();
        blogData.append('title', formData.title);
        blogData.append('content', formData.content);
        blogData.append('categoryId', formData.category);
        blogData.append('image', formData.image);
        dispatch(postBlog(blogData)).then((res) => {
            if (res.payload?.success === true) {
                toast.success(res.payload.message);
                dispatch(getBlogs())
                navigate("/my-blogs");
            } else {
                toast.error(res.payload || "Something went wrong");
            }
        });

    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
            bgcolor="#f5f5f5"

        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    p: 3,
                    boxShadow: 4,
                    borderRadius: 2,
                    bgcolor: '#fff',
                }}
            >
                <Typography variant="h5" mb={2} textAlign="center">
                    Create New Blog
                </Typography>

                <Stack spacing={1.5}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        required
                    />

                    <TextField
                        label="Content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        required
                    />

                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        required
                    >
                        {categories.map((item, index) => (
                            <MenuItem key={item.category} value={item.id} >
                                {item.category}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        Upload Image
                        <input
                            type="file"
                            name="image"
                            hidden
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </Button>

                    {formData.preview && (
                        <Box
                            mt={1}
                            sx={{
                                height: 150,
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '1px solid #ddd',
                            }}
                        >
                            <img
                                src={formData.preview}
                                alt="Preview"
                                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Posting..." : "Post Blog"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};


export default CreateBlog; 
