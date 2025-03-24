import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const SwitchLeftIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M8.5 8.62v6.76L5.12 12zM10 5l-7 7 7 7zm4 0v14l7-7z" />
      </svg>
    </SvgIcon>
  );
};
export default SwitchLeftIcon;
