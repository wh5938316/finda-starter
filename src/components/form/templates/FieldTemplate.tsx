// src/components/form/templates/FieldTemplate.tsx
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material';
import type { FieldTemplateProps } from '@rjsf/utils';

const FieldTemplate = ({
  id,
  children,
  displayLabel,
  label,
  required,
  // eslint-disable-next-line @eslint-react/no-unstable-default-props
  rawErrors = [],
  errors,
  help,
  description,
  hidden,
  schema,
}: FieldTemplateProps) => {
  if (hidden) {
    return <Box sx={{ display: 'none' }}>{children}</Box>;
  }

  // 如果是数组项内的字段，且父级是对象，则不显示标签
  const isArrayItemField = id.includes('_') && schema.type === 'object';
  const showLabel = displayLabel && !isArrayItemField;
  const hasError = rawErrors?.length > 0;

  return (
    <FormControl fullWidth error={hasError}>
      {showLabel && (
        <Box sx={{ mb: 1 }}>
          <FormLabel htmlFor={id} error={hasError}>
            {label}
            {required && (
              <Box component="span" sx={{ ml: 0.5, color: 'error.main' }}>
                *
              </Box>
            )}
          </FormLabel>
        </Box>
      )}
      {children}
      {description && <FormHelperText sx={{ mt: 0.5 }}>{description}</FormHelperText>}
      {errors && <FormHelperText error>{errors}</FormHelperText>}
      {help && <FormHelperText>{help}</FormHelperText>}
    </FormControl>
  );
};

export default FieldTemplate;
