import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import {
    Box, TextField, Button, Typography, Card, Stepper,
    Step, StepLabel
} from '@mui/material';
import { toast } from 'react-toastify';
import api from "../../../toolkit/api/apiAccessPoint.js"

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [resetPassword, setResetPassword] = useState({
        password: '',
        confirmPassword: ''
    });


    const steps = ['Generate OTP', 'Verify OTP', 'Reset Password'];

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);


    //  Genrate Otp
    const generateOtp = async (e) => {
        e.preventDefault();
        try {
            if (!/^\d{10}$/.test(phone)) { toast.error("Phone number must be exactly 10 digits"); return; }
            const { data } = await api.post("/genrate/otp", { phone }, { headers: { "Content-Type": "application/json" } })
            if (data.success) {
                toast.success(data.message)
                handleNext();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "internal server Error Try Again Later")
        }

    };

    //  Verify Otp -
    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            if (otp.length !== 6) { toast.error("Otp cantains 6 digits , please check again you 6 digit otp"); return; }
            console.log(phone, otp)
            const { data } = await api.post("/verify/otp", { phone, otp }, { headers: { "Content-Type": "application/json" } })
            if (data.success) {
                toast.success(data.message)
                handleNext();
            }
        } catch (error) {

            toast.error(error.response?.data?.message || "internal server Error Try Again Later")
        }
    };

    //  reset Password  -
    const submitPassword = async (e) => {
        e.preventDefault();

        try {

            if (resetPassword.password !== resetPassword.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const { data } = await api.post("/forget/password", { phone, ...resetPassword }, { headers: { "Content-Type": "application/json" } })
            if (data.success) {
                toast.success(data.message);
                navigate("/sign-in")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "internal server Error Try Again Later")
        }
    };

    return (
        <Box display="grid" sx={{ minHeight: '90vh', pt: 8, backgroundColor: '#f5f5f5', placeItems: "center" }}>
            <Card sx={{ maxWidth: 500, margin: 'auto', p: 4, boxShadow: 3 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Forgot Password
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (

                    <form onSubmit={generateOtp}>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            inputMode="numeric"
                            required
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                            Generate OTP
                        </Button>
                    </form>

                )}

                {activeStep === 1 && (
                    <form onSubmit={verifyOtp}>
                        <TextField
                            label="OTP"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            inputMode="numeric"
                            required
                            sx={{ mb: 2 }}
                        />
                        <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                            <Button onClick={handleBack} variant="outlined" sx={{ flex: 1 }}>
                                Back
                            </Button>
                            <Button type="submit" variant="contained" sx={{ flex: 2 }}>
                                Verify OTP
                            </Button>
                        </Box>

                    </form>
                )}

                {activeStep === 2 && (
                    <form onSubmit={submitPassword}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            name="password"
                            value={resetPassword.password}
                            onChange={(e) => setResetPassword({ ...resetPassword, password: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            name="confirmPassword"
                            value={resetPassword.confirmPassword}
                            onChange={(e) => setResetPassword({ ...resetPassword, confirmPassword: e.target.value })}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
                            <Button onClick={handleBack} variant="outlined" sx={{ flex: 1 }}>
                                Back
                            </Button>
                            <Button type="submit" variant="contained" sx={{ flex: 2 }}>
                                Reset Password
                            </Button>
                        </Box>
                    </form>
                )}
            </Card>
        </Box>
    );
};

export default ForgotPassword;
