import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Button, Box, CircularProgress, Divider } from '@mui/material';
import { getBlogs } from "../../toolkit/action/blog.action.js";
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import Search from "../Navigation/Search/Search.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    return (
        <>
            <Search />
            <Box sx={{ padding: 3 }}>
                {/* Header Section */}
                <Box
                    sx={{
                        height: '300px',
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Welcome to the Blog App
                    </Typography>
                    <Button variant="contained" color="success" sx={{ mt: 3 }}>
                        <Link
                            to="/new/blog"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                display: 'block',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Write New Blog
                        </Link>
                    </Button>
                </Box>

                <Divider />

                <Typography variant="h4" align="center" color='primary' sx={{ m: 5 }}>
                    Latest Blogs
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Blog Grid */}
                {status === "loading" ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error" align="center">{error}</Typography>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {Array.isArray(blogs) && blogs.map(blog => (
                            <Grid item key={blog.id} xs={12} sm={6} md={3}>
                                <BlogCard blog={blog} />
                            </Grid>
                        ))}
                    </Grid>

                )}
            </Box>
        </>
    );
};

export default Home;
