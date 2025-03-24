import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ExpandLessIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
      </svg>
    </SvgIcon>
  );
};
export default ExpandLessIcon;
