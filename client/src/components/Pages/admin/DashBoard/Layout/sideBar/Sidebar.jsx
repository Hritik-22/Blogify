import React, { useState } from 'react';
import {
    Box,
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
} from '@mui/material';
import {
    AccountCircle,
    HomeFilled,
    Category,
    VerifiedUser
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';
import { useSelector } from 'react-redux';


const drawerWidth = 240;

const sections = [
    {
        title: 'HOME',
        items: [
            { label: 'Home', icon: <HomeFilled />, to: '/dashboard' },
        ],
    },
    {
        title: 'Create Forms',
        items: [
            { label: 'Category add', icon: <Category />, to: 'add-categories' },
            { label: 'User add', icon: <VerifiedUser />, to: 'create-user' },

        ],
    }
];

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useSelector(state => state.auth)

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };


    return (
        <Drawer
            variant="permanent"

            sx={{
                width: sidebarOpen ? drawerWidth : 60,
                flexShrink: 0,
                transition: 'width 0.3s',
                '& .MuiDrawer-paper': {
                    width: sidebarOpen ? drawerWidth : 60,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                },
            }}
        >
            <Topbar onToggleSidebar={toggleSidebar} />
            <Box
                mb={3}
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent={sidebarOpen ? 'flex-start' : 'center'}
                px={2}
            >
                <AccountCircle color="primary" />
                {sidebarOpen && (
                    <Typography variant="h6" fontWeight={600}>
                        {`Hello ${user?.firstName + "!"}`}
                    </Typography>
                )}
            </Box>

            {sections.map((section, idx) => (
                <Box key={idx} mb={2}>
                    {sidebarOpen && (
                        <Typography
                            variant="caption"
                            sx={{ pl: 2, color: 'text.secondary', fontWeight: 500 }}
                        >
                            {section.title}
                        </Typography>
                    )}
                    <List disablePadding>
                        {section.items.map((item, i) => (
                            <ListItem
                                key={i}
                                disablePadding
                                component={NavLink}
                                to={item.to}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                sx={{
                                    my: 0.5,
                                    mx: 1,
                                    borderRadius: 2,
                                    '&.active': {
                                        backgroundColor: '#E3F2FD',
                                        color: '#1976d2',
                                        '& .MuiListItemIcon-root': {
                                            color: '#1976d2',
                                        },
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
                                        px: 2,
                                        py: 1,
                                    }}
                                >
                                    <Tooltip title={sidebarOpen ? '' : item.label} placement="right">
                                        <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
                                    </Tooltip>
                                    {sidebarOpen && <ListItemText primary={item.label} />}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ))}
            <Divider />
        </Drawer>
    );
};

export default Sidebar;
