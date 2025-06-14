import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./App.css";

import Header from './components/Pages/Navigation/Header/Header';
import Login from './components/Auth/login/Login';
import Register from './components/Auth/register/Register';
import Logout from './components/Auth/logout/Logout';
import PasswordUpdate from './components/Auth/password/PasswordUpdate';
import FogotPassword from './components/Auth/password/ForgotPassword/FogotPassword';

import Home from './components/Pages/home/Home';

import Blogs from './components/Pages/Blogs/view-blog/Blogs';
import SingleBlog from './components/Pages/Blogs/view-single-Blog/SingleBlog';
import PostedBlog from './components/Pages/Blogs/Posted-blogs/PostedBlog';
import CreateBlog from './components/Pages/Blogs/post-new-blog/CreateBlog';
import UpdateBlog from './components/Pages/Blogs/Update-Blog/UpdateBlog';

import Contact from './components/Pages/Contact/Contact';
import About from './components/Pages/About/About';

import Profile from './components/Pages/admin/Profile/Profile';
import UpdateProfile from './components/Pages/admin/updateProfile/UpdateProfile';
import { userProfile } from './components/toolkit/action/authAction';
import AdminDashboard from './components/Pages/admin/DashBoard/AdminDashboard';
import ProtectedRoute from './Routes';
import DashbordHome from './components/Pages/admin/DashBoard/Layout/Home/DashbordHome';
import ViewBlogs from './components/Pages/admin/DashBoard/Blogs/ViewBlogs';
import ViewCategories from './components/Pages/admin/DashBoard/Category/viewCategories';
import AddCategory from './components/Pages/admin/DashBoard/Category/AddCategory';
import UpdateCategory from './components/Pages/admin/DashBoard/Category/UpdateCategory';
import ViewUsers from './components/Pages/admin/DashBoard/users/ViewUsers';
import UpdateUser from './components/Pages/admin/DashBoard/users/UpdateUser';
import CreateUser from './components/Pages/admin/DashBoard/users/CreateUser';
import ViewContacts from './components/Pages/admin/DashBoard/Contact/ViewContacts';
import UpdateContact from './components/Pages/admin/DashBoard/Contact/UpdateContact';
import NotFound from './components/Pages/NotFound';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);


  return (
    <Routes>
      <Route path="/" element={<Header />} >
        {/* Public Routes */}
        <Route index element={<Home />} />

        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:keyword" element={<Blogs />} />
        <Route path="blog/:id" element={<SingleBlog />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="forget/password" element={<FogotPassword />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="me" element={<Profile />} />
          <Route path="update/profile" element={<UpdateProfile />} />
          <Route path="new/blog" element={<CreateBlog />} />
          <Route path="blog/update/:id" element={<UpdateBlog />} />
          <Route path="logout" element={<Logout />} />
          <Route path="my-blogs" element={<PostedBlog />} />
          <Route path="password/change" element={<PasswordUpdate />} />

          {/* Admin Dashboard with Nested Routes */}
          <Route path="dashboard" element={<AdminDashboard />} >
            <Route index element={<DashbordHome />} />
            <Route path="categories" element={<PostedBlog />} />
            <Route path="all-blogs" element={<ViewBlogs />} />
            <Route path="all-categories" element={<ViewCategories />} />
            <Route path="add-categories" element={<AddCategory />} />
            <Route path="update-categories/:id" element={<UpdateCategory />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="all-users" element={<ViewUsers />} />
            <Route path="user/update/:id" element={<UpdateUser />} />
            <Route path="users/queries" element={<ViewContacts />} />
            <Route path="update/query/:id" element={<UpdateContact />} />
          </Route>
        </Route>
      </Route>
    </Routes>

  )
}
export default App;
