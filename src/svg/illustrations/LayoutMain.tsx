import React from 'react';

const LayoutMain = ({
  width = 94,
  height = 94,
  fillColor = 'currentColor',
}: IllustrationProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 94 94"
    >
      <g
        fill="none"
        fillRule="evenodd"
        transform="translate(-963 -562) translate(307 541) translate(21) translate(635 21)"
      >
        <rect
          width="93"
          height="92"
          x="0.5"
          y="0.5"
          stroke={fillColor}
          rx="4"
        ></rect>
        <rect width="58" height="6" x="18" y="6" fill={fillColor} rx="1"></rect>
        <rect
          width="58"
          height="71"
          x="18"
          y="16"
          fill={fillColor}
          rx="1"
        ></rect>
      </g>
    </svg>
  );
};

export default LayoutMain;
