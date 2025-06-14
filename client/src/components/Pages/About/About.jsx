import React from 'react';
import {
    Box,
    Typography,
    Container,
    Stack,
    Card,
    Divider,
    IconButton,
    Tooltip
} from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import MetaData from '../../meta/MetaData';

const About = () => {
    return (
        <section className="section-height" style={{ backgroundColor: '#f5f5f5', display: " grid", placeItems: "center" }}>
            < MetaData title={"About"} />
            <Container maxWidth="md">
                <Card elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
                    <Stack spacing={3} alignItems="center" textAlign="center">

                        {/* Heading */}
                        <Typography variant="h4" fontWeight="bold">
                            About Blogger.com
                        </Typography>

                        <Divider sx={{ width: '100%' }} />

                        {/* Website Info */}
                        <Typography variant="body1">
                            <strong>Blogger.com</strong> is a free platform where anyone can post blogs, share thoughts,
                            and interact via comments. It’s designed to be simple, powerful, and accessible to all.
                        </Typography>

                        {/* Tech Stack */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                🚀 Built With:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                React.js • Node.js • Express.js • Sequelize • MySQL
                            </Typography>
                        </Box>

                        {/* Testing Note */}
                        <Typography variant="body2" color="text.secondary">
                            This is a testing project. If you have any suggestions or feedback, I’d love to hear from you!
                        </Typography>

                        {/* Divider */}
                        <Divider sx={{ width: '100%' }} />

                        {/* Developer Info & Social Links */}
                        <Typography variant="body1" fontWeight="bold">
                            Created by Ritik Dubey
                        </Typography>

                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Tooltip title="GitHub">
                                <IconButton href="https://github.com/Hritik-22" target="_blank">
                                    <GitHub />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="LinkedIn">
                                <IconButton href="https://www.linkedin.com/in/theritikdubey" target="_blank">
                                    <LinkedIn />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Email">
                                <IconButton href="mailto:ritikdubey414@gmail.com">
                                    <Email />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Card>
            </Container>
        </section >
    );
};

export default About;
