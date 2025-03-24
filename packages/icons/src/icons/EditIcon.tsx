import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const EditIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z" />
      </svg>
    </SvgIcon>
  );
};
export default EditIcon;
