import React from 'react';
import {
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Divider
} from '@mui/material';
import "../Navbar.css"


import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const unAuth = [
    { name: 'Login', path: "/sign-in" },
    { name: 'Register', path: "/sign-up" }]

const pages = [
    { name: 'Home', path: "/" },
    { name: 'Blogs', path: "/blogs" },
    { name: 'About', path: "/about" },
    { name: 'Contact', path: "/contact" }];

const settings = [
    { name: 'Profile', path: "/me" },
    { name: 'Post Blog', path: "/new/blog" },
    { name: 'My Blogs', path: "/my-blogs" },
    { name: 'Logout', path: "/logout" }];


const Header = () => {

    const { isAuthenticated, user } = useSelector(state => state.auth);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <>
            <div position="fixed" className='navbar-header'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            Blogify
                        </Typography>

                        {/* Mobile Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton onClick={handleOpenNavMenu} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                                        <Link to={page.path} className='mobile-navbar-link' sx={{ textAlign: "center" }}>{page.name}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Logo (mobile) */}

                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Blogger
                        </Typography>

                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to={page.path} className='desktop-navbar-link'>{page.name}</Link>
                                </Button>
                            ))}
                        </Box>

                        {/* Avatar Settings */}
                        <Box sx={{ flexGrow: 0 }}>
                            {isAuthenticated ? <><Tooltip title="Show menu">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={isAuthenticated ? user?.firstname : ""} src="/avatar.jpg" />
                                </IconButton>
                            </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    {user?.role !== "user" && (
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography
                                                component={Link}
                                                to="/dashboard"
                                                sx={{ color: 'inherit', textDecoration: 'none', textAlign: "center" }}
                                            >
                                                Dashboard
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    {settings.map((setting, index) => (
                                        <MenuItem key={index} onClick={handleCloseUserMenu}>
                                            <Typography component={Link} to={setting.path} textAlign="center" sx={{ color: 'inherit', textDecoration: 'none' }}>{setting.name}</Typography>
                                        </MenuItem>
                                    ))}

                                </Menu></> : <><Tooltip title="sign-in / sign-up">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Authenticate" src="/avatar.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >

                                    {unAuth.map((item, index) => (
                                        <MenuItem key={index} onClick={handleCloseUserMenu}>
                                            <Typography component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none', textAlign: "center" }}>{item.name}</Typography>
                                        </MenuItem>
                                    ))}

                                </Menu></>}
                        </Box>
                    </Toolbar>
                </Container>
            </div>
            <Divider sx={{ paddingTop: "60px" }} />

            <Outlet />
        </>
    );
};

export default Header;
