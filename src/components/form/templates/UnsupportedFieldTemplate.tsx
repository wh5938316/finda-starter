import { Alert, AlertTitle, Box } from '@mui/material';
import type { UnsupportedFieldProps } from '@rjsf/utils';

const UnsupportedFieldTemplate = ({ schema, reason }: UnsupportedFieldProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="error">
        <AlertTitle>不支持的字段类型: {schema.type}</AlertTitle>
        {reason && (
          <Box component="p" sx={{ mt: 0.5 }}>
            原因: {reason}
          </Box>
        )}
      </Alert>
    </Box>
  );
};

export default UnsupportedFieldTemplate;
