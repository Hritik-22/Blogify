import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../../../../meta/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import { updateQuerie } from '../../../../toolkit/action/userAction';

const UpdateContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { status, queries } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        status: '',
        remark: ''
    });

    useEffect(() => {
        if (queries?.data) {
            setFormData({
                status: queries.data.status || '',
                remark: queries.data.remark || ''
            });
        }
    }, [queries]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateQuerie({ id, formData })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message || 'Updated successfully');
                navigate('/dashboard/users/queries');
            } else {
                toast.error(res.payload?.message || 'Failed to update');
            }
        });
    };

    return (
        <>
            {status === 'loading' ? (
                <Typography variant="h6" textAlign="center" mt={4}>
                    Updating query...
                </Typography>
            ) : (
                <section
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                        minHeight: '90vh',
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <MetaData title="Update Query Status" />
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            m: 2,
                            width: { xs: '100%', sm: '400px' },
                            maxWidth: '100%'
                        }}
                    >
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Update Query Status
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Remark"
                                name="remark"
                                type="text"
                                fullWidth
                                margin="normal"
                                value={formData.remark}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                select
                                label="Select Status"
                                name="status"
                                fullWidth
                                margin="normal"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="resolved">Resolved</MenuItem>
                            </TextField>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Update Query
                            </Button>
                        </form>
                    </Paper>
                </section>
            )}
        </>
    );
};

export default UpdateContact;
