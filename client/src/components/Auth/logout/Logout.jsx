import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../toolkit/action/authAction';
import { Button, Link, Typography } from '@mui/material';
import "./Logout.css"
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(userLogout());
    }
  }, [isAuthenticated, dispatch, userLogout]);

  return (
    <div className='logout-page'>
      <Typography>{user?.message}</Typography>
      <Button variant='outlined' onClick={() => navigate("/")}>back to home</Button>
    </div>
  )
}

export default Logout