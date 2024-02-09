import React from 'react';
import { useTheme } from '@mui/material/styles';

const LaptopSkeleton = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      enableBackground="new 0 0 999 577"
      viewBox="0 0 999 577"
    >
      <path
        fill={theme.palette.background.paper}
        stroke={mode === 'light' ? '#ccc' : theme.palette.alternate.dark}
        strokeMiterlimit="10"
        d="M881.3 577H117.5c-14.4 0-26.2-11.8-26.2-26.2V26.7C91.3 12.3 103.1.5 117.5.5h763.9c14.4 0 26.2 11.8 26.2 26.2v524.2c-.1 14.3-11.9 26.1-26.3 26.1z"
      ></path>
      <circle cx="498" cy="23.8" r="3" fill="#F7F7F7"></circle>
      <path
        fill={theme.palette.alternate.dark}
        d="M996.3 561.2H2.9c-1.5 0-2.8-1.3-2.8-2.8 0-1.5 1.3-2.8 2.8-2.8h993.4c1.5 0 2.8 1.3 2.8 2.8 0 1.5-1.2 2.8-2.8 2.8z"
      ></path>
      <path
        fill={theme.palette.alternate.dark}
        d="M499.6 563L0 561.2s24.1 11.3 117.8 15.8h763.5c93.7-4.5 117.8-15.8 117.8-15.8L499.6 563z"
      ></path>
      <path
        fill="none"
        stroke={mode === 'light' ? '#ccc' : theme.palette.background.level2}
        strokeMiterlimit="10"
        d="M591.4 562.7h-184c-1.9 0-3.5-1.6-3.5-3.5v-3.5H595v3.5c0 1.9-1.6 3.5-3.6 3.5z"
      ></path>
    </svg>
  );
};

export default LaptopSkeleton;
