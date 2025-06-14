import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user } = useSelector(state => state.auth);
    return user && Object.keys(user).length > 0 ? <Outlet /> : <Navigate to="/sign-in" />;
}
export default ProtectedRoute;
