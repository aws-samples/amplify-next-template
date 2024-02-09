import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';

const IndexView = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main bgcolor={'background.paper'}>
        <Box
          sx={{
            backgroundImage: `linear-gradient(to bottom, ${alpha(
              theme.palette.background.paper,
              0,
            )}, ${alpha(theme.palette.alternate.main, 1)} 100%)`,
            backgroundRepeat: 'repeat-x',
            position: 'relative',
          }}
        ></Box>
      </Main>
    </Box>
  );
};

export default IndexView;
