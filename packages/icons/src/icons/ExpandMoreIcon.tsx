import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ExpandMoreIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </SvgIcon>
  );
};
export default ExpandMoreIcon;
