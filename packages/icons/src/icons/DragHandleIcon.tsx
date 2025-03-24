import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const DragHandleIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20 9H4v2h16zM4 15h16v-2H4z" />
      </svg>
    </SvgIcon>
  );
};
export default DragHandleIcon;
