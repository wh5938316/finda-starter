import { Box, Typography } from '@mui/material';
import type { FieldErrorProps } from '@rjsf/utils';

const FieldErrorTemplate = ({ errors = [] }: FieldErrorProps) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 1 }}>
      {errors.map((error, i) => (
        <Typography key={i} variant="caption" color="error">
          {error}
        </Typography>
      ))}
    </Box>
  );
};

export default FieldErrorTemplate;
