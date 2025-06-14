import { useNavigate } from 'react-router-dom';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Box, Typography,
    Pagination, Stack, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllQueries, getSingalQuery } from '../../../../toolkit/action/userAction';

const ViewContacts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, status, queries } = useSelector(state => state.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        dispatch(getAllQueries({ currentPage, keyword }));
    }, [dispatch, currentPage]);

    const handleUpdate = (id) => {
        dispatch(getSingalQuery(id));
        navigate(`/dashboard/update/query/${id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllQueries({ currentPage, keyword }));
    };

    const PageCount = queries?.resultPerPage
        ? Math.ceil(queries.queryCount / queries.resultPerPage)
        : 1;

    return (
        <>
            {status === "loading" ? (
                <Typography align="center" mt={4}>Loading...</Typography>
            ) : queries?.data?.length > 0 ? (
                <section style={{ backgroundColor: "#f5f5f5", minHeight: "90vh", paddingTop: "1.5vmax", }}>
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
                            placeholder="Search Using Contact and Name..."
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
                        <Table sx={{ minWidth: 650 }} aria-label="queries table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Full Name</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Message</TableCell>
                                    <TableCell align="center">Requested Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Remark</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {queries.data.map((item, index) => (
                                    <TableRow key={item.id || index}>
                                        <TableCell align="center" sx={{ textTransform: "capitalize" }}>{item.name}</TableCell>
                                        <TableCell align="center">{item.phone}</TableCell>
                                        <TableCell align="center">{item.message}</TableCell>
                                        <TableCell align="center">
                                            {item.createdAt?.slice(0, 10).split("-").reverse().join("/")}
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: item.status === "pending" ? "tomato" : theme => theme.palette.success.main }}>
                                            {item.status}
                                        </TableCell>
                                        <TableCell align="center">{item.remark}</TableCell>
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
                <Box display="flex" justifyContent="center" alignItems="center" height="90dvh">
                    <Typography variant="h6" color="textSecondary">{error}</Typography>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="90dvh">
                    <Typography variant="h6" color="textSecondary">Users Not Found.</Typography>
                </Box>
            )}
        </>
    );
};

export default ViewContacts;
