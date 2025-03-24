import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const ReportProblemIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z" />
      </svg>
    </SvgIcon>
  );
};
export default ReportProblemIcon;
