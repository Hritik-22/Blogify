import React, { useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Link as MuiLink,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singleBlog } from '../../../toolkit/action/blog.action';
import MetaData from '../../../meta/MetaData';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';


const SingleBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const { blogs, suggestBlogs } = useSelector((state) => state.blog);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(singleBlog(id));
    }, [dispatch, id]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <section style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', gap: "2vmax" }}>
            <Box sx={{ p: 2, maxWidth: 1010, mx: 'auto', }}>
                <MetaData title={"single-blog"} />

                {/* Main Blog Card */}
                <Card sx={{ p: 2, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={blogs?.images?.publicUrl}
                        alt={blogs?.title}
                        sx={{ borderRadius: 2, maxHeight: 500 }}
                    />
                    {console.log(blogs?.images?.publicUrl)}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: isMobile ? 'center' : 'space-between',
                            alignItems: 'center',
                            textAlign: isMobile ? 'center' : 'left',
                            gap: 1,
                            mt: 2,
                            backgroundColor: '#111',
                            p: 2,
                            borderRadius: 1,
                            color: 'white',
                        }}
                    >
                        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                            📅 Posted on: {blogs?.createdAt?.slice(0, 10).split('-').reverse().join('/')}
                        </Typography>
                        <MuiLink
                            component={Link}
                            to={`/profile/${blogs?.userId}`}
                            underline="hover"
                            sx={{
                                fontSize: '0.75rem',
                                fontStyle: 'italic',
                                fontWeight: 400,
                                color: '#ccc'
                            }}
                        >
                            ✍️ Author: {blogs?.user?.firstName} {blogs?.user?.lastName}
                        </MuiLink>
                    </Box>


                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        fontWeight="bold"
                        mt={3}
                        textAlign="center"
                    >
                        {blogs?.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        mt={2}
                        color="text.secondary"
                        sx={{
                            textAlign: 'justify',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.7
                        }}
                    >
                        {blogs?.content}
                    </Typography>
                </Card>

                {/* Suggested Blogs */}

                <Card sx={{ pb: 5, borderRadius: 2, mt: 2 }}>
                    {suggestBlogs?.length > 0 && (
                        <Box mt={6} textAlign="center">
                            <Typography variant="h6" mb={2}>
                                You may also like These Blogs -
                            </Typography>

                            {/* Scroll buttons */}
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
                                    sx={{ position: 'absolute', top: '40%', left: 0, zIndex: 1 }}
                                >
                                    <ArrowBackIos />
                                </IconButton>

                                <Box
                                    ref={scrollRef}
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        overflowX: 'auto',
                                        scrollBehavior: 'smooth',
                                        gap: 3,
                                        px: 1.5,
                                        py: 2,
                                        maxWidth: 'calc(250px * 3 + 60px)', // 3 cards + 2 gaps of 24px
                                        mx: 'auto', // center horizontally
                                    }}
                                >

                                    {suggestBlogs.map((item) => {

                                        return (
                                            <Card
                                                key={item.id}
                                                component={Link}
                                                to={`/blog/${item.id}`}
                                                sx={{
                                                    minWidth: 250,
                                                    maxWidth: 250,
                                                    height: 250,
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    borderRadius: 2,
                                                    overflow: 'hidden',
                                                    boxShadow: 3,
                                                    flex: '0 0 auto',
                                                    transition: 'transform 0.2s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                    },
                                                }}
                                            >

                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={item?.images?.publicUrl}
                                                    alt={item.title}
                                                />
                                                <CardContent sx={{ px: 2, py: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        fontWeight={600}
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        {item.content}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </Box>

                                <IconButton
                                    onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
                                    sx={{ position: 'absolute', top: '40%', right: 0, zIndex: 1 }}
                                >
                                    <ArrowForwardIos />
                                </IconButton>
                            </Box>
                        </Box>
                    )}
                </Card>

            </Box>
        </section>
    );
};

export default SingleBlog;
