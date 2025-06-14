import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useNavigate
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, myBlogs } from '../../../toolkit/action/blog.action';
import { Box, Typography } from '@mui/material';
import { toast } from "react-toastify";


const PostedBlog = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)
    React.useEffect(() => {
        if (isAuthenticated) {
            dispatch(myBlogs());
        }
    }, [dispatch, myBlogs, isAuthenticated])
    const { error, status, myBlog } = useSelector(state => state.blog);

    const handleDelete = (id) => {
        dispatch(deleteBlog(id)).then((res) => {
            if (res.payload?.success === true) {
                toast.success(res.payload.message);
                dispatch(myBlogs());
            } else {
                toast.error(res.payload || "Something went wrong");
            }
        });
    };

    return (
        <>
            {status === "loading" ? "Loading...." : myBlog?.length > 0 ? <section style={{ backgroundColor: "#f5f5f5", minHeight: "90vh" }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="posted blogs table">
                        <TableHead>
                            <TableRow sx={{ textAlign: "center" }}>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Content</TableCell>
                                <TableCell align="center">Posted Date</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myBlog?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={item?.images?.publicUrl} alt={item.title} width={50} height={50} />
                                    </TableCell>
                                    <TableCell>{item.title?.slice(0, 20)} ...</TableCell>
                                    <TableCell>{item.content?.slice(0, 100)} ...</TableCell>

                                    <TableCell>{item.createdAt?.slice(0, 10).split("-").reverse().join("/")}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" size="small" color="primary" sx={{ m: 0.5 }}
                                            onClick={() => navigate(`/blog/${item.id}`)}>
                                            View
                                        </Button>
                                        <Button variant="outlined" size="small" color="warning" sx={{ m: 0.5 }}
                                            onClick={() => navigate(`/blog/update/${item.id}`)}
                                        >
                                            Update
                                        </Button>
                                        <Button variant="outlined" size="small" color="error" sx={{ m: 0.5 }}
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
            </section> : <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90dvh"
            >
                <Typography variant="h6" color="textSecondary">
                    You have not posted blog yet
                </Typography>
            </Box>}
        </>
    );
};

export default PostedBlog;
