import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const SortDescIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path d="M320 768V0H192v768H31.99L256 992.01 480.01 768zM448 0h576v128H448zM448 192h448v128H448zM448 384h320v128H448z" />
        <path d="M448 576h192v128H448z" />
      </svg>
    </SvgIcon>
  );
};
export default SortDescIcon;
