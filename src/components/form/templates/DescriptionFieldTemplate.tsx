import { Typography } from '@mui/material';
import type { DescriptionFieldProps } from '@rjsf/utils';

const DescriptionFieldTemplate = ({ description, id }: DescriptionFieldProps) => {
  if (!description) {
    return null;
  }

  return (
    <Typography id={id} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {description}
    </Typography>
  );
};

export default DescriptionFieldTemplate;
