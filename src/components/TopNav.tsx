import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import ThemeModeToggler from 'components/ThemeModeToggler';

interface Props {
  colorInvert?: boolean;
}

const TopNav = ({ colorInvert = false }: Props): JSX.Element => {
  return (
    <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Link
          underline="none"
          component="a"
          href="https://docs.cleverbridge.com/public/all/home.htm"
          target={'blank'}
          color={colorInvert ? 'common.white' : 'text.primary'}
        >
          Docs
        </Link>
      </Box>
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

export default TopNav;
