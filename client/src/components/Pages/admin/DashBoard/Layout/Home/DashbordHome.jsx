import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    Typography,
    Grid,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlogs } from '../../../../../toolkit/action/blog.action';
import { getAllQueries, getAllUsers } from '../../../../../toolkit/action/userAction';
import { getCategories } from '../../../../../toolkit/action/CategoriesAction';


const DashboardCards = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { blogCount } = useSelector(state => state.blog);
    const { categoryCount } = useSelector(state => state.category);
    const { usersCount } = useSelector(state => state.users)
    const { queryCount } = useSelector(state => state.users?.queries)


    useEffect(() => {
        dispatch(getBlogs());
        dispatch(getCategories());
        dispatch(getAllUsers());
        dispatch(getAllQueries());
    }, [dispatch]);

    const data = [
        {
            icon: <ArticleIcon />,
            value: blogCount,
            label: 'View Blogs',
            color: '#ffe5e8',
            iconBg: '#ff7c89',
            textColor: '#ff3b58',
            link: "/dashboard/all-blogs"
        },
        {
            icon: <CategoryIcon />,
            value: categoryCount,
            label: 'View Categories',
            color: '#fff2cc',
            iconBg: '#fbbf24',
            textColor: '#d97706',
            link: "/dashboard/all-categories"
        },
        {
            icon: <GroupIcon />,
            value: queryCount,
            label: 'Support queries',
            color: '#d9fcd8',
            iconBg: '#4ade80',
            textColor: '#15803d',
            link: "/dashboard/users/queries"
        },
        {
            icon: <GroupIcon />,
            value: usersCount,
            label: 'View Users',
            color: '#f3e8ff',
            iconBg: '#c084fc',
            textColor: '#7e22ce',
            link: "/dashboard/all-users"
        },
    ];

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: '#f8fbfe',
                boxShadow: '0 0 20px rgba(0,0,0,0.03)',
            }}
        >
            <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
            >
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Website's Summary
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3} display="flex" justifyContent="space-evenly">
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                backgroundColor: item.color,
                                borderRadius: 4,
                                p: 2.5,
                                height: '100%',
                                minWidth: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                            elevation={0}
                        >
                            <Box
                                sx={{
                                    backgroundColor: item.iconBg,
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    cursor: "pointer",
                                }}
                                onClick={() => item.link && navigate(item.link)}
                            >
                                {React.cloneElement(item.icon, { style: { color: '#fff' } })}
                            </Box>
                            <Typography variant="h6" fontWeight={700} color="text.primary">
                                {item.value}
                            </Typography>
                            <Typography variant="body2" fontWeight={500} color="text.secondary">
                                {item.label}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardCards;
