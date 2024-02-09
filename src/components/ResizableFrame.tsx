// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';

interface ResizableFrameProps {
  src: string;
  title: string;
  path: string;
  iframeStyles?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const viewportWidthMap = {
  desktop: '100%',
  tablet: 850,
  mobile: 480,
};

const viewportInitialHeight = 600;

const ResizableFrame = ({
  src,
  title,
  path,
  iframeStyles = {},
  ...rest
}: ResizableFrameProps): JSX.Element => {
  const theme = useTheme();
  const iframeEl = useRef(null);
  const [viewportWidth, setViewportWidth] = useState('desktop');
  const [viewportHeight, setViewportHeight] = useState(600);
  const [random, setRandom] = useState(0);

  const setIframeHeight = () => {
    if (
      iframeEl &&
      iframeEl.current &&
      iframeEl.current.contentWindow &&
      iframeEl.current.contentWindow.document &&
      iframeEl.current.contentWindow.document.documentElement
    ) {
      const height =
        iframeEl.current.contentWindow.document.documentElement.offsetHeight ||
        viewportInitialHeight;
      setViewportHeight(height);
    }
  };

  useEffect(() => {
    setIframeHeight();
  }, [viewportWidth]);

  useEffect(() => {
    setRandom(random + 1);
  }, [theme.palette.mode]);

  const handleResizeBtnClick = (width) => {
    if (width === viewportWidth) {
      return;
    }

    const values = Object.keys(viewportWidthMap);
    if (values.indexOf(width) === -1) {
      return;
    }

    setViewportWidth(width);
  };

  return (
    <Container maxWidth={1500} {...rest}>
      <Box>
        <Box marginBottom={2}>
          <Typography variant={'h5'} fontWeight={900} gutterBottom>
            {title}
          </Typography>
          <Box display={{ xs: 'none', md: 'flex' }} alignItems={'center'}>
            <Box
              component={'svg'}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={16}
              height={16}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </Box>
            <Typography
              variant={'caption'}
              color={'text.secondary'}
              marginLeft={1}
            >
              {path}
            </Typography>
          </Box>
        </Box>
        <Box
          width={1}
          border={`1px solid ${theme.palette.divider}`}
          borderRadius={2}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={2}
            borderBottom={`1px solid ${theme.palette.divider}`}
          >
            <Button
              component={'a'}
              href={
                'https://material-ui.com/store/items/the-front-landing-page/'
              }
              target={'_blank'}
              variant={'contained'}
              size="large"
              endIcon={
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              }
            >
              Get the code
            </Button>
            <Box display={'flex'} alignItems={'center'}>
              <ButtonGroup
                variant="outlined"
                aria-label="divise screen resize"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                }}
              >
                <Button
                  variant={
                    viewportWidth === 'mobile' ? 'contained' : 'outlined'
                  }
                  title={'Mobile view'}
                  onClick={() => handleResizeBtnClick('mobile')}
                >
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </Box>
                </Button>
                <Button
                  variant={
                    viewportWidth === 'tablet' ? 'contained' : 'outlined'
                  }
                  title={'Tablet view'}
                  onClick={() => handleResizeBtnClick('tablet')}
                >
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </Box>
                </Button>
                <Button
                  variant={
                    viewportWidth === 'desktop' ? 'contained' : 'outlined'
                  }
                  title={'Desktop view'}
                  onClick={() => handleResizeBtnClick('desktop')}
                >
                  <Box
                    component={'svg'}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </Box>
                </Button>
              </ButtonGroup>
              <Button
                component={'a'}
                href={src}
                target={'_blank'}
                variant={'outlined'}
                sx={{ marginLeft: 2 }}
              >
                <Box
                  component={'svg'}
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </Box>
              </Button>
            </Box>
          </Box>
          <Box bgcolor={'alternate.dark'}>
            <NoSsr>
              <Box
                maxWidth={viewportWidthMap[viewportWidth]}
                width={1}
                display={'flex'}
              >
                <iframe
                  ref={iframeEl}
                  key={random}
                  src={src}
                  onLoad={() => setTimeout(() => setIframeHeight())}
                  style={{
                    height: viewportHeight || '100%',
                    minHeight: 400,
                    width: '100%',
                    border: 'none',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    ...iframeStyles,
                  }}
                />
              </Box>
            </NoSsr>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ResizableFrame;
