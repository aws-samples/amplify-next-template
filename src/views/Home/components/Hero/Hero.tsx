import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';

const Hero = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      position={'relative'}
      sx={{
        backgroundImage: 'url("home_hero_image.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: -13,
        paddingTop: 13,
        '&:after': {
          position: 'absolute',
          content: '" "',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          background: '#161c2d',
          opacity: 0.6,
        },
      }}
    >
      <Container
        zIndex={3}
        position={'relative'}
        minHeight={{ xs: 300, sm: 400, md: 600 }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              align={'center'}
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
              Your friendly Copilots
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h4"
              align={'center'}
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
              Welcome to the Future of Work at Cleverbridge.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box
        component={'svg'}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        width={1}
        marginBottom={-1}
        position={'relative'}
        zIndex={2}
      >
        <path
          fill={theme.palette.background.paper}
          d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
        ></path>
      </Box>
    </Box>
  );
};

export default Hero;
