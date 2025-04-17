import { Box, Typography } from '@mui/material';
import type { ArrayFieldTitleProps } from '@rjsf/utils';

const ArrayFieldTitleTemplate = <T extends object>({
  title,
  required,
}: ArrayFieldTitleProps<T>) => {
  if (!title) {
    return null;
  }

  return (
    <Typography variant="h6" component="h3">
      {title}
      {required && (
        <Box component="span" sx={{ ml: 0.5, color: 'error.main' }}>
          *
        </Box>
      )}
    </Typography>
  );
};

export default ArrayFieldTitleTemplate;
