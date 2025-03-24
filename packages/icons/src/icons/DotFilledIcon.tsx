import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const DotFilledIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
        <path
          fill="currentColor"
          d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0 2.375 2.375 0 0 1 4.75 0"
        />
      </svg>
    </SvgIcon>
  );
};
export default DotFilledIcon;
