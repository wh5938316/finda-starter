import { Box, Typography } from '@mui/material';
import type { TitleFieldProps } from '@rjsf/utils';

const TitleFieldTemplate = ({ title, id, required }: TitleFieldProps) => {
  if (!title) {
    return null;
  }

  return (
    <Typography id={id} variant="h6" component="h3">
      {title}
      {required && (
        <Box component="span" sx={{ ml: 0.5, color: 'error.main' }}>
          *
        </Box>
      )}
    </Typography>
  );
};

export default TitleFieldTemplate;
