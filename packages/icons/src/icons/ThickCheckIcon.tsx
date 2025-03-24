import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ThickCheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9">
        <path
          fillRule="evenodd"
          d="M8.535.623a.75.75 0 0 1 .218 1.038L4.508 8.16a.75.75 0 0 1-1.13.146L.615 5.808a.75.75 0 1 1 1.006-1.113l2.11 1.91L7.498.84A.75.75 0 0 1 8.535.623"
          clipRule="evenodd"
        />
      </svg>
    </SvgIcon>
  );
};
export default ThickCheckIcon;
