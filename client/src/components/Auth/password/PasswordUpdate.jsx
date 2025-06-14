import React, { useEffect, useState } from 'react';
import MetaData from '../../meta/MetaData';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "../Form.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changePassword } from '../../toolkit/action/authAction';


const PasswordUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, message, isAuthenticated } = useSelector(state => state.auth);

    const [updatePassword, setUpdatePassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [fieldError, setFieldError] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatePassword(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field error when user starts typing
        if (fieldError) {
            setFieldError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (updatePassword.oldPassword === updatePassword.newPassword) {
            return setFieldError("Old password and new password should not be the same.");
        }
        if (updatePassword.newPassword !== updatePassword.confirmNewPassword) {
            return setFieldError("New password and confirm password must match.");
        }


        if (isAuthenticated) {
            dispatch(changePassword(updatePassword)).then(res => {
                if (res.payload.success) {
                    toast.success(res.payload.message);
                    navigate("/");
                } else {
                    toast.error(res.payload.message);
                }
            })

        }


    };

    return (
        <>
            <MetaData title="Update Password" />
            <div className="login-form">
                <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                    <div className="form-heading">
                        <Typography variant="h5" textAlign="center" gutterBottom>
                            Update Password
                        </Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Old Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="oldPassword"
                            value={updatePassword.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="newPassword"
                            value={updatePassword.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Confirm New Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="confirmNewPassword"
                            value={updatePassword.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />

                        {/* Show validation error */}
                        {fieldError && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {fieldError}
                            </Typography>
                        )}

                        <div className="submitButton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Update Password
                            </Button>
                        </div>
                    </form>

                    <div className="navigatore">
                        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                            Forgot Password?{' '}
                            <Link to="/password/forgot">
                                Reset Here
                            </Link>
                        </Typography>
                    </div>
                </Paper>
            </div>
        </>
    );
}

export default PasswordUpdate;
