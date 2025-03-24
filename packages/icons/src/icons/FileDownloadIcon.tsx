import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';

const FileDownloadIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
      </svg>
    </SvgIcon>
  );
};
export default FileDownloadIcon;
