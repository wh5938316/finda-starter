import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(properties: any) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...properties}
      sx={[
        {
          color: 'text.secondary',
        },
        ...(Array.isArray(properties.sx) ? properties.sx : [properties.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Sitemark
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
