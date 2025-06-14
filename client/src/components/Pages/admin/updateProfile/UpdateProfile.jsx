import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../../../meta/MetaData';
import { updateUserProfile } from '../../../toolkit/action/authAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { error, user, isAuthenticated } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        gender: user?.gender || '',
        userName: user?.userName || ''
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [error, isAuthenticated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(formData)).then(res => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
                navigate("/me")
            } else {
                toast.error(res.payload?.message);
            }
        });
    };

    return (

        <section style={{ display: "grid", placeItems: "center", minHeight: "90vh", backgroundColor: "#f5f5f5" }}>
            <MetaData title="Update Profile" />

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
                    Update Profile
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        fullWidth
                        margin="normal"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        fullWidth
                        margin="normal"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Username"
                        name="userName"
                        fullWidth
                        margin="normal"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Update
                    </Button>
                </form>
            </Paper>
        </section>
    );
};

export default UpdateProfile;
