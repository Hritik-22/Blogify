import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { getBlogs } from '../../../toolkit/action/blog.action';
import { toast } from 'react-toastify';
import MetaData from '../../../meta/MetaData';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Search from '../../Navigation/Search/Search';

const Blogs = () => {
    const { keyword } = useParams()
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const { error, status, blogs, blogCount, resultPerPage } = useSelector(state => state.blog);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getBlogs({ keyword, currentPage }));
    }, [dispatch, error, currentPage, keyword]);

    const PageCount = blogCount && resultPerPage ? Math.ceil(blogCount / resultPerPage) : 1;

    const paginationOptions = {
        count: PageCount,
        variant: "outlined",
        color: "primary",
        page: currentPage,
        onChange: (e, value) => {
            setCurrentPage(value);
        }
    }
    return (
        <>
            <Search />
            <MetaData title="Blogs" />
            {
                status === "loading" ? (
                    <Typography align="center" mt={4}>Please wait, loading blogs...</Typography>
                ) : (
                    <Box sx={{ minWidth: '100%', minHeight: '100vh', backgroundColor: '#f5f5f5', py: 4 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                            {Array.isArray(blogs) && blogs.length > 0 ? (
                                blogs.map((item, index) => (
                                    <BlogCard key={item.id || index} blog={item} />
                                ))
                            ) : (
                                <Typography>No blogs available.</Typography>
                            )}
                        </Box>


                        <Stack spacing={3} align="center" display="flex" alignItems="center" p={3}>
                            <Pagination {...paginationOptions} />
                        </Stack>
                    </Box>
                )
            }
        </>
    );
};

export default Blogs;
