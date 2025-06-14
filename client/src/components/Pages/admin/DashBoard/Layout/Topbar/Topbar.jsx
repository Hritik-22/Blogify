import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Avatar,
    Button,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Topbar = ({ onToggleSidebar }) => {
    return (
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', alignItems: "right" }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton onClick={onToggleSidebar} edge="start">
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Topbar;
