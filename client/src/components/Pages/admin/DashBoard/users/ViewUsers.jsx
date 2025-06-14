import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography,
    Pagination, Stack, TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { deleteUser, getAllUsers, getSingleUser } from '../../../../toolkit/action/userAction';

const ViewUsers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, status, resultPerPage, usersCount, users } = useSelector(state => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(getAllUsers({ currentPage }));
    }, [dispatch, currentPage]);

    const handleUpdate = (id) => {
        dispatch(getSingleUser(id));
        navigate(`/dashboard/user/update/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            const res = await dispatch(deleteUser(id));
            if (res.payload?.success) {
                toast.success(res.payload.message || "User deleted successfully");
            } else {
                toast.error(res.payload?.message || "Failed to delete user");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllUsers({ keyword, currentPage }));
    }

    const PageCount = users && resultPerPage ? Math.ceil(usersCount / resultPerPage) : 1;

    return (
        <>
            {status === "loading" ? (
                <Typography align="center" mt={4}>Loading...</Typography>
            ) : users?.length > 0 ? (
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
                            placeholder="Search Using FirstName LastName email and Phone..."
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
                                    <TableCell align="center">Full Name</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Posted Date</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.map((item, index) => (
                                    <TableRow key={item.id || index}>
                                        <TableCell align="center">
                                            {item.firstName + item.lastName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.email}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.phone}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.role}
                                        </TableCell>
                                        <TableCell align="center">
                                            {item.createdAt?.slice(0, 10).split("-").reverse().join("/")}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="warning"
                                                sx={{ m: 0.5 }}
                                                onClick={() => handleUpdate(item.id)}
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
            ) : error ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="90dvh"
                >
                    <Typography variant="h6" color="textSecondary">
                        {error}
                    </Typography>
                </Box>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="90dvh"
                >
                    <Typography variant="h6" color="textSecondary">
                        Users Not Found.
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default ViewUsers;
