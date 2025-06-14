import { useEffect, useState } from 'react';
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
import { singleBlog, updateBlog } from '../../../toolkit/action/blog.action';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories } = useSelector(state => state.category);
    const { blogs } = useSelector(state => state.blog);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        image: null,
        preview: ''
    });

    // Fetch categories and blog details - 

    useEffect(() => {
        dispatch(getCategories());
        dispatch(singleBlog(id));
    }, [dispatch, id]);

    // Update form when blog data is available
    useEffect(() => {
        if (blogs && blogs.id) {
            let preview = '';
            try {
                preview = blogs.images ? JSON.parse(blogs.images)?.publicUrl : null;

            } catch (err) {
                console.error("Invalid JSON in blog images", err);
            }

            setFormData({
                title: blogs.title || '',
                content: blogs.content || '',
                category: blogs.categoryId || '',
                image: null,
                preview: preview
            });
        }
    }, [blogs]);

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
        if (formData.image) {
            blogData.append('image', formData.image);
        }

        dispatch(updateBlog({ blogData, id })).then((res) => {
            setIsSubmitting(false);
            if (res.payload?.success === true) {
                toast.success(res.payload.message);
                navigate("/my-blogs");
            } else {
                toast.error(res.payload?.message || "Something went wrong");
            }
        });
    };

    if (!blogs || !blogs.id) {
        return <Typography align="center" mt={4}>Loading blog data...</Typography>;
    }

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
                    Update Blog
                </Typography>

                <Stack spacing={2}>
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
                        {categories && categories.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
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
                        {isSubmitting ? "Updating..." : "Update Blog"}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default UpdateBlog;
