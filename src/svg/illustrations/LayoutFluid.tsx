import React from 'react';

const LayoutFluid = ({
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
      <g fill="none" fillRule="evenodd">
        <rect
          width="93"
          height="92"
          x="0.5"
          y="0.5"
          stroke={fillColor}
          rx="3.5"
        ></rect>
        <rect width="10" height="3" x="8" y="8" fill={fillColor} rx="1"></rect>
        <rect width="10" height="3" x="21" y="8" fill={fillColor} rx="1"></rect>
        <rect width="10" height="3" x="34" y="8" fill={fillColor} rx="1"></rect>
        <rect
          width="19"
          height="3"
          x="57"
          y="8"
          fill={fillColor}
          rx="1.5"
        ></rect>
        <circle cx="83" cy="9" r="3" fill={fillColor}></circle>
      </g>
    </svg>
  );
};

export default LayoutFluid;
