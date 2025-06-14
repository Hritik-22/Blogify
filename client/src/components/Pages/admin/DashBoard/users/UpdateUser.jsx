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
    MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MetaData from '../../../../meta/MetaData';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../../../../toolkit/action/userAction';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()

    const { status, error, users } = useSelector(state => state.users);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phone: '',
        gender: '',
        role: ''
    });

    useEffect(() => {
        if (users) {
            setFormData({
                firstName: users.firstName || '',
                lastName: users.lastName || '',
                userName: users.userName || '',
                email: users.email || '',
                phone: users.phone || '',
                role: users.role || "",
                gender: users.gender || ''

            });
        }
    }, [users]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await dispatch(updateUser({ id, formData }))
            if (res.payload?.success) {
                toast.success(res.payload?.message || "Updated SuccessFully")
                navigate("/dashboard/all-users")
            }
        } catch (err) {
            toast.error('Failed to update profile');
            console.error(err);
        };
    };



    return (
        <>{status === "loading" ? <> <Typography variant="h6" textAlign="center" mt={4}>
            Your form is loading...
        </Typography></> : <section style={{ display: "grid", placeItems: "center", minHeight: "90vh", backgroundColor: "#f5f5f5" }}>
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
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        margin="normal"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>


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
        </section>}


        </>
    );
};

export default UpdateUser;
