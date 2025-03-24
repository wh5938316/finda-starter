import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const GoogleColorfulIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
        <path
          fill="#4285F4"
          d="M15.68 8.182q-.001-.85-.146-1.637H8v3.099h4.306a3.7 3.7 0 0 1-1.608 2.407v2.015h2.596c1.513-1.397 2.386-3.448 2.386-5.884"
        />
        <path
          fill="#34A853"
          d="M8 16c2.16 0 3.97-.713 5.294-1.934l-2.596-2.015c-.713.48-1.622.77-2.698.77-2.08 0-3.847-1.403-4.48-3.294H.858v2.066A7.99 7.99 0 0 0 8 16"
        />
        <path
          fill="#FBBC05"
          d="M3.52 9.52c-.16-.48-.255-.99-.255-1.52s.095-1.04.255-1.52V4.415H.858A7.9 7.9 0 0 0 0 8c0 1.295.313 2.51.858 3.585l2.073-1.614z"
        />
        <path
          fill="#EA4335"
          d="M8 3.185c1.178 0 2.226.408 3.062 1.193l2.29-2.29C11.965.792 10.16 0 8 0 4.873 0 2.175 1.796.858 4.415L3.52 6.48C4.153 4.59 5.92 3.185 8 3.185"
        />
      </svg>
    </SvgIcon>
  );
};
export default GoogleColorfulIcon;
