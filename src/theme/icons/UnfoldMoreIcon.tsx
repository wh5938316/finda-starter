import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

const UnfoldMoreIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15z" />
      </svg>
    </SvgIcon>
  );
};
export default UnfoldMoreIcon;
