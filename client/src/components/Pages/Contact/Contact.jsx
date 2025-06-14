import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Divider,
    Link,
    Stack,
    Card
} from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import MetaData from '../../meta/MetaData';
import { useDispatch } from 'react-redux';
import { contact } from '../../toolkit/action/authAction';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contactData, setContactData] = useState({
        name: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, phone, message } = contactData;
        if (!name || !phone || !message) { return toast.error("All fields are required") }

        if (!/^\d{10}$/.test(phone)) { return toast.error("Phone number must be exactly 10 digits"); }

        dispatch(contact(contactData)).then(res => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
                setContactData({ name: '', phone: '', message: '' });
                navigate("/");
            } else {
                toast.error(res.payload?.message || "Something went wrong");
            }
        });
    };

    return (
        <section className='contact-container' style={{ backgroundColor: '#f5f5f5', minHeight: '90vh', display: "grid", placeItems: "center" }}>
            <MetaData title={"Contact"} />
            <Box id="contact" sx={{ maxWidth: 1000 }}>
                <Card elevation={3} sx={{ width: '100%', p: 5, backgroundColor: '#fff', textAlign: 'center' }}>
                    <Typography variant="h4">Contact Us</Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mt: 4 }}>
                        {/* Contact Form */}
                        <Card
                            elevation={3}
                            sx={{
                                flex: 1,
                                px: { xs: 2, md: 4 },
                                py: { xs: 2, md: 3 },
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Typography variant="h6" textAlign="center" mb={1}>
                                Request a Call
                            </Typography>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={contactData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    type="text"
                                    inputMode="numeric"
                                    value={contactData.phone}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Message"
                                    name="message"
                                    multiline
                                    rows={3}
                                    value={contactData.message}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    Send
                                </Button>
                            </form>
                        </Card>

                        {/* Contact Info */}
                        <Card
                            elevation={3}
                            sx={{
                                flex: 1,
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                py: 4,
                                px: { xs: 2, md: 6 },
                            }}
                        >
                            <Box sx={{ width: '100%' }}>

                                <Typography variant="h6" textAlign="center" mb={5}>
                                    Need help writing a blog? Use our  Writer : {" "}
                                    <Link
                                        href="https://chatbot-mern-stack-pi.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{ cursor: "pointer", textDecoration: "none", color: "tomato" }}
                                    >
                                        Use AI to Genrate  blogs
                                    </Link>
                                </Typography>
                                <Divider sx={{ mb: 3 }} />

                                <Typography textAlign="center" mb={3}>
                                    Contact us via Email or Social Media
                                </Typography>


                                <Divider sx={{ mb: 3 }} />

                                <Stack spacing={2} sx={{ alignItems: 'flex-start', textAlign: 'left' }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <LocationOn color="primary" />
                                        <Typography><strong>Address:</strong> Dewas, India</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Phone color="primary" />
                                        <Typography>
                                            <strong>Contact:</strong>{' '}
                                            <Link href="tel:+917477081114" underline="hover">
                                                +91 7477081114
                                            </Link>
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Email color="primary" />
                                        <Typography>
                                            <strong>Email:</strong>{' '}
                                            <Link href="mailto:ritikdubey414@gmail.com" underline="hover">
                                                ritikdubey414@gmail.com
                                            </Link>
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                    © All Rights Reserved
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                </Card>
            </Box>
        </section>
    );
};

export default Contact;