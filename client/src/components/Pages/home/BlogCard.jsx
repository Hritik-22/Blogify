import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const BlogCard = ({ blog }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, minHeight: 425, marginBottom: 3, boxShadow: 3 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog.user?.firstName?.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${blog.title?.slice(0, 60)} ...`}
                subheader={blog.createdAt?.slice(0, 10).split("-").reverse().join("-")}
            />
            <CardMedia
                component="img"
                height="200"
                image={blog?.images?.publicUrl}
                alt={blog.title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "justify" }}>
                    {blog.content.length > 100 ? `${blog.content.slice(0, 100)}...` : blog.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ pb: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        px: 2, // optional horizontal padding
                        mt: 1,
                    }}
                >
                    <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                        <Typography sx={{ color: 'primary.main' }}>
                            Read More
                        </Typography>
                    </Link>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ marginBottom: 2, textAlign: "center", color: "tomato", zIndex: 99 }}>Full Content:</Typography>
                    <Typography sx={{ textAlign: "justify" }}>{blog.content}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default BlogCard;
