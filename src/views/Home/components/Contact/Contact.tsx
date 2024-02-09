/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Contact = (): JSX.Element => {
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box>
          <Typography fontWeight={700} variant={'h5'} gutterBottom>
            Interested in creating a Copilot?
          </Typography>
          <Typography>Hit us up and we'll get in touch with you.</Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Button variant="contained" color="primary" size="large">
            Contact us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
