import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon';

const RemoveIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 13H5v-2h14z" />
      </svg>
    </SvgIcon>
  );
};
export default RemoveIcon;
