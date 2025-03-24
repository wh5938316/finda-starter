import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const CameraIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path d="M14.25 3h-1.73l-.324-.864A1.76 1.76 0 0 0 10.557 1H7.443c-.726 0-1.384.457-1.638 1.136L5.481 3h-1.73a2.75 2.75 0 0 0-2.75 2.75v6.5A2.75 2.75 0 0 0 3.751 15H14.25A2.75 2.75 0 0 0 17 12.25v-6.5A2.75 2.75 0 0 0 14.25 3M4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2m5 5a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
      </svg>
    </SvgIcon>
  );
};
export default CameraIcon;
