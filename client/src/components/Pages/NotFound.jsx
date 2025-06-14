import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Box
            sx={{

                height: '91vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'monospace',
            }}
        >
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', textTransform: "capitalize" }}>
                404 | page not found
                <Box
                    component="span"
                    sx={{
                        width: '10px',
                        height: '24px',
                        bgcolor: 'red',
                        ml: 1,
                        animation: 'blink 1s steps(2, start) infinite',
                    }}
                />
            </Typography>

            <style>
                {`
          @keyframes blink {
            to {
              visibility: hidden;
            }
          }
        `}
            </style>
        </Box>
    );
};

export default NotFound;
