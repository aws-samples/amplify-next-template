import React from 'react';
import { useTheme } from '@mui/material/styles';

const PhoneSkeleton = (): JSX.Element => {
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x={0}
      y={0}
      enableBackground="new 0 0 444 908"
      viewBox="0 0 444 908"
    >
      <path
        fill={theme.palette.background.paper}
        stroke={theme.palette.alternate.dark}
        strokeMiterlimit="10"
        d="M378.8.5H65.6C29.6.5.5 29.6.5 65.6V843c0 35.9 29.1 65.1 65.1 65.1h313.2c35.9 0 65.1-29.1 65.1-65.1V65.6c0-36-29.2-65.1-65.1-65.1zm46.5 838.8c0 28-21.8 50.7-48.8 50.7H67.9c-26.9 0-48.8-22.7-48.8-50.7V74.1c0-28 21.8-50.7 48.8-50.7h35.3c4 0 7.2 3.4 7.2 7.5 0 14.9 11.6 27 26 27h171.5c14.4.1 26-12 26-27 0-4.1 3.2-7.5 7.2-7.5h35.4c26.9 0 48.8 22.7 48.8 50.7v765.2z"
      ></path>
      <path
        fill="none"
        stroke={theme.palette.alternate.dark}
        strokeMiterlimit="10"
        strokeWidth="4"
        d="M243.3 37.3h-46.4c-2 0-3.6-1.6-3.6-3.6h0c0-2 1.6-3.6 3.6-3.6h46.4c2 0 3.6 1.6 3.6 3.6h0c0 2-1.6 3.6-3.6 3.6z"
      ></path>
      <circle
        cx="270"
        cy="33.7"
        r="5.5"
        fill="none"
        stroke={theme.palette.alternate.dark}
        strokeMiterlimit="10"
        strokeWidth="4"
      ></circle>
      <path
        fill={theme.palette.alternate.dark}
        d="M285.7 880.3h-127c-1.4 0-2.6-1.2-2.6-2.6 0-1.4 1.2-2.6 2.6-2.6h127c1.4 0 2.6 1.2 2.6 2.6 0 1.5-1.2 2.6-2.6 2.6z"
      ></path>
    </svg>
  );
};

export default PhoneSkeleton;
