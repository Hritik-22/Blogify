import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography,
    Pagination, Stack,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from "../../../../toolkit/action/blog.action";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';

const ViewBlogs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, status, blogs, blogCount, resultPerPage } = useSelector(state => state.blog);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(getBlogs({ currentPage }));
    }, [dispatch, currentPage]);

    const handleDelete = async (id) => {
        const res = await dispatch(deleteBlog(id));
        if (res.meta?.requestStatus === "fulfilled") {
            toast.success("Deleted Successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBlogs({ currentPage, keyword }));
    };

    const PageCount = blogCount && resultPerPage ? Math.ceil(blogCount / resultPerPage) : 1;

    return (
        <>
            {status === "loading" ? (
                <Typography align="center" mt={4}>Loading...</Typography>
            ) : blogs?.length > 0 ? (
                <section style={{ backgroundColor: "#f5f5f5", minHeight: "90vh", paddingTop: "1.5vmax" }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            border: '1px solid #f60',
                            borderRadius: '999px',
                            overflow: 'hidden',
                            maxWidth: 600,
                            maxHeight: "42px",
                            width: '100%',
                            mx: 'auto',
                            mb: 2
                        }}
                    >
                        <TextField
                            placeholder="Search Using Title..."
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,

                                    pr: 1,
                                    height: '100%',
                                },
                                '& fieldset': {
                                    border: 'none',
                                },
                            }}

                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: 0,
                                px: 3,
                                backgroundColor: '#f60',
                                '&:hover': {
                                    backgroundColor: '#e55d00',
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="posted blogs table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Content</TableCell>
                                    <TableCell align="center">Posted Date</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {blogs?.map((item, index) => (
                                    <TableRow key={item.id || index}>
                                        <TableCell align="center">
                                            <img
                                                src={JSON.parse(item.images).publicUrl}
                                                alt={item.title}
                                                width={50}
                                                height={50}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.title?.slice(0, 20)}...
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.content?.slice(0, 100)}...
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.createdAt?.slice(0, 10).split("-").reverse().join("/")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                                sx={{ m: 0.5 }}
                                                onClick={() => navigate(`/blog/${item.id}`)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="warning"
                                                sx={{ m: 0.5 }}
                                                onClick={() => navigate(`/blog/update/${item.id}`)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                sx={{ m: 0.5 }}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={3} alignItems="center" p={3}>
                        <Pagination
                            count={PageCount}
                            variant="outlined"
                            color="primary"
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                        />
                    </Stack>
                </section>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="90dvh"
                >
                    <Typography variant="h6" color="textSecondary">
                        You have not posted any blogs yet.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default ViewBlogs;
