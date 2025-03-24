import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ArrowDropDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="m7 10 5 5 5-5z" />
      </svg>
    </SvgIcon>
  );
};
export default ArrowDropDownIcon;
