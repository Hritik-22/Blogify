import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Layout/sideBar/Sidebar';
import "./dashboard.css"
import MetaData from '../../../meta/MetaData';




const AdminDashboard = () => {



    return (
        <Box sx={{
            display: 'flex', minHeight: '90vh'
        }}>
            <MetaData title={"admin DashBoard"} />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box >
    );
};

export default AdminDashboard;
