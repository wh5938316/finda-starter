import { Typography } from '@mui/material';
import type { ArrayFieldDescriptionProps } from '@rjsf/utils';

const ArrayFieldDescriptionTemplate = <T extends object>({
  description,
}: ArrayFieldDescriptionProps<T>) => {
  if (!description) {
    return null;
  }

  return (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {description}
    </Typography>
  );
};

export default ArrayFieldDescriptionTemplate;
