import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Grid,
    Card,

    Button,

} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        keyword?.trim() ? (navigate(`/blogs/${keyword}`)) : (navigate(`/blogs`))

    };
    return (
        <Box sx={{ bgcolor: '#f5f5f5', }}>
            <Grid container justifyContent="center">
                <Card
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: { xs: "100%", sm: "50%" },
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                        px: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <TextField
                            placeholder="Search blogs... By title & category"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                        <Button variant="outlined" type="submit" size="small">
                            Search
                        </Button>
                    </Box>
                </Card>
            </Grid>
        </Box>

    )
}

export default Search
