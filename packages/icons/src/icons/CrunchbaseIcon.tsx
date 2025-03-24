import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const CrunchbaseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.6 0H2.4A2.41 2.41 0 0 0 0 2.4v19.2A2.41 2.41 0 0 0 2.4 24h19.2a2.41 2.41 0 0 0 2.4-2.4V2.4A2.41 2.41 0 0 0 21.6 0" />
        <path
          fill="#fff"
          d="M9.84 13.42a2.11 2.11 0 1 1 0-1.75h1.66a3.69 3.69 0 1 0 0 1.75ZM16 8.85h-.27a3.74 3.74 0 0 0-1.8.63V5.37h-1.5v10.57h1.51v-.38a3.68 3.68 0 0 0 3.39.38 3.6 3.6 0 0 0 1.06-.63A3.67 3.67 0 0 0 16 8.85m2.1 4a.2.2 0 0 1 0 .07 1.2 1.2 0 0 1-.06.26 2 2 0 0 1-.1.26 2.07 2.07 0 0 1-1 1 2 2 0 0 1-.41.15h-.8800000000000001a2 2 0 0 1-.54-.17 1.9 1.9 0 0 1-.47-.32 2 2 0 0 1-.37-.45c0-.09-.1-.17-.14-.26a2.2 2.2 0 0 1-.17-.85 2.1 2.1 0 0 1 .2-.9 2.13 2.13 0 0 1 1.7-1.2h.21a2.12 2.12 0 0 1 2.12 2.12 3 3 0 0 1-.09.24Z"
        />
      </svg>
    </SvgIcon>
  );
};
export default CrunchbaseIcon;
