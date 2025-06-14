import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography,
    Pagination, Stack,
    TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { deleteCategories, getCategories } from '../../../../toolkit/action/CategoriesAction';
import MetaData from '../../../../meta/MetaData';

const ViewCategories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, status, categories, categoryCount, resultPerPage } = useSelector(state => state.category);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    // Fetch categories whenever page or keyword changes
    useEffect(() => {
        dispatch(getCategories({ currentPage }));
    }, [dispatch, currentPage]);

    const handleDelete = async (id) => {
        const res = await dispatch(deleteCategories(id));
        if (res.payload?.success === true) {
            toast.success(res.payload.message);
        } else {
            toast.error(res.payload?.message || "Something went wrong");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getCategories({ currentPage, keyword }));
    };

    const PageCount = categoryCount && resultPerPage ? Math.ceil(categoryCount / resultPerPage) : 1;

    return (
        <>
            {status === "loading" ? (
                <Typography align="center" mt={4}>Loading...</Typography>
            ) : categories?.length > 0 ? (
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
                            placeholder="Search Using Category name..."
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
                        <MetaData title={"view categories"} />
                        <Table sx={{ minWidth: 650 }} aria-label="categories table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Index</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((item, index) => (
                                    <TableRow key={item.id || index}>
                                        <TableCell align="center">{index + 1 + (currentPage - 1) * resultPerPage}</TableCell>
                                        <TableCell align="center">{item.category}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="warning"
                                                sx={{ m: 0.5 }}
                                                onClick={() => navigate(`/dashboard/update-categories/${item.id}`)}
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
                        No categories found.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default ViewCategories;
