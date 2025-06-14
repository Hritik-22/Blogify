import React, { useEffect, useState } from 'react'
import MetaData from '../../meta/MetaData'
import { TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "../Form.css"
import { loginUser } from '../../toolkit/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, status, user, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) { toast.error(error) }
        if (isAuthenticated) { navigate("/") }
    }, [toast, error, isAuthenticated, navigate])


    const [loginData, setLoginData] = useState({ user: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginData)).then(res => {
            if (res.payload.success === true) {
                toast.success(res.payload?.message);
                navigate("/me");
            } else {
                toast.error(res.payload.message);
            }
        })
    };
    return (
        <>
            <MetaData title="sign-in" />
            <div className='login-form'>
                <Paper elevation={3} sx={{ padding: 4, width: 400 }}>

                    <div className="form-hedding">
                        <Typography variant="h5" textAlign="center" gutterBottom>
                            Sign In
                        </Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User Id"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            name='user'
                            value={loginData.user}
                            placeholder='email / number / user-name'
                            onChange={handleChange}
                            required
                        />
                        <div className="password">
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="password"
                                name='password'
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="navigatore">
                                <Typography variant="body2" textAlign="right" sx={{ mt: 2 }}>
                                    <Link to="/forget/password" underline="hover">
                                        Forget Password
                                    </Link>
                                </Typography>
                            </div>
                        </div>

                        <div className="submitButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>

                    <div className="navigatore">
                        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                            New user?{' '}
                            <Link to="/sign-up" underline="hover">
                                Sign-Up
                            </Link>
                        </Typography>
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default Login;
