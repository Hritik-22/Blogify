import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../toolkit/action/authAction.js';
import { toast } from 'react-toastify';
import MetaData from '../../meta/MetaData.jsx';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
        userName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then(res => {
            if (res.payload.success === true) {
                toast.success(res.payload?.message);
                navigate("/sign-in")

            } else {
                toast.error(res.payload.message);
            }
        })
    };

    return (
        <div className='register-form'>
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <MetaData title={"sign-up"} />
                <div className="form-hedding">
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Sign Up
                    </Typography>
                </div>
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
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <FormControl margin="normal">
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
                        Register
                    </Button>
                </form>
                <div className="navigatore">
                    <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                        New user?{'  '}
                        <Link to="/sign-in" underline="hover">
                            Sign-in
                        </Link>
                    </Typography>
                </div>
            </Paper>
        </div>
    );
};

export default Register;
