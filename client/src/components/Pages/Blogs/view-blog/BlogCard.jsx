import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 300,
                height: 360,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                borderRadius: 2,
                m: 1,
                p: 1.5,
                overflow: 'hidden'
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={blog?.images?.publicUrl}
                alt={blog.title}
            />

            <CardContent sx={{ px: 2, py: 1, flex: 1 }}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {blog.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {blog.content}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                        color: 'text.secondary',
                    }}
                >
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        📅 {blog.createdAt.slice(0, 10).split('-').reverse().join('-')}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontStyle: 'italic' }}>
                        ✍️ {`${blog.user?.firstName} ${blog.user?.lastName}`}
                    </Typography>
                </Box>

            </CardContent>

            <CardActions sx={{ justifyContent: 'center', pb: 1 }}>
                <Button type="submit" variant="contained" fullWidth
                    onClick={() => navigate(`/blog/${blog.id}`)}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
