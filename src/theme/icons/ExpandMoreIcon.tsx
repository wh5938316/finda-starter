import type { SvgIconProps } from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';

function ExpandMoreIcon(properties: SvgIconProps) {
  return (
    <SvgIcon {...properties}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </SvgIcon>
  );
}
export default ExpandMoreIcon;
