import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import NoSsr from '@mui/material/NoSsr';

import Container from 'components/Container';
import TopNav from 'components/TopNav';

import { Footer } from './components';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
}

const Fluid = ({
  children,
  colorInvert = false,
  bgcolor = 'alternate.main',
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollTo = (id: string): void => {
    setTimeout(() => {
      const element: HTMLElement = document.querySelector(`#${id}`)!;
      if (!element) {
        return;
      }

      window.scrollTo({ left: 0, top: element.offsetTop, behavior: 'smooth' });
    });
  };

  return (
    <Box id="js--fluid-top">
      <AppBar
        position={'relative'}
        sx={{
          top: 0,
          backgroundColor: bgcolor,
        }}
        elevation={0}
      >
        <Container
          maxWidth={1500}
          paddingTop={'8px !important'}
          paddingBottom={'0 !important'}
        >
          <TopNav colorInvert={colorInvert} />
        </Container>
        <Container paddingY={1} maxWidth={1500}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={1}
          >
            <Box
              display={'flex'}
              component="a"
              href="/"
              title="theFront"
              width={{ xs: 100, md: 120 }}
            >
              <Box
                component={'img'}
                src={
                  mode === 'light' && !colorInvert
                    ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                    : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
                }
                height={1}
                width={1}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              component="a"
              target="blank"
              href="https://mui.com/store/items/the-front-landing-page/"
              size="large"
            >
              Buy now
            </Button>
          </Box>
        </Container>
      </AppBar>
      <main>
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
      <NoSsr>
        <Zoom in={trigger}>
          <Box
            onClick={() => scrollTo('js--fluid-top')}
            role="presentation"
            sx={{ position: 'fixed', bottom: 24, right: 32 }}
          >
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      </NoSsr>
    </Box>
  );
};

export default Fluid;
