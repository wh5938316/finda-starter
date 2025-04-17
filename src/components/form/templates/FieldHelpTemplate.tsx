import { Typography } from '@mui/material';
import type { FieldHelpProps } from '@rjsf/utils';

const FieldHelpTemplate = ({ help }: FieldHelpProps) => {
  if (!help) {
    return null;
  }

  return (
    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
      {help}
    </Typography>
  );
};

export default FieldHelpTemplate;
