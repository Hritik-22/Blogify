import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Typography,
    useMediaQuery,
    useTheme,
    Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import "./profile.css";
import MetaData from '../../../meta/MetaData';


const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <section className="profile-section" style={{ display: "grid", placeItems: "center", minHeight: "90vh" }}>
            <MetaData title={"profile"} />

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    mx: 'auto',
                    px: isMobile ? 2 : 0,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}
            >
                {/* LEFT SIDE CARD */}
                <Card
                    sx={{
                        width: isMobile ? '100%' : 350,
                        p: 3,
                        textAlign: 'center',
                        alignSelf: 'stretch',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Box>
                        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}>
                            <PersonIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6">
                            {user?.firstName} {user?.lastName}
                        </Typography>
                        <Typography variant="body2" color="warning" sx={{ mt: 1 }}>
                            {user?.role}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            sx={{ width: '55%', mx: 'auto' }}
                            component={Link}
                            to="/update/profile"
                        >
                            Update Profile
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ width: '55%', mx: 'auto' }}
                            component={Link}
                            to="/password/change"
                        >
                            Update Password
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ width: '55%', mx: 'auto' }}
                            component={Link}
                            to="/my-blogs"
                        >
                            My Blogs
                        </Button>
                    </Box>
                </Card>

                {/* RIGHT SIDE INFO CARD */}
                <Card
                    sx={{
                        width: isMobile ? '100%' : 350,
                        p: 3,

                        alignSelf: 'stretch',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Username:</Typography>
                        <Typography>{user?.userName}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Full Name:</Typography>
                        <Typography>{user?.firstName + ' ' + user?.lastName}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Role:</Typography>
                        <Typography>{user?.role}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Email:</Typography>
                        <Typography>{user?.email}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Phone:</Typography>
                        <Typography>+91 {user?.phone}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Country:</Typography>
                        <Typography>India</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography sx={{ width: 120, fontWeight: 600 }}>Gender:</Typography>
                        <Typography>{user?.gender}</Typography>
                    </Box>
                </Card>
            </Box>

        </section>
    );
};

export default Profile;





