import { Delete } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import type { WrapIfAdditionalTemplateProps } from '@rjsf/utils';
import * as React from 'react';

const WrapIfAdditionalTemplate = <T extends object>({
  children,
  classNames,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  schema,
}: WrapIfAdditionalTemplateProps<T>) => {
  const additional = Object.prototype.hasOwnProperty.call(schema, 'additionalProperties');

  if (!additional) {
    return <Box className={classNames}>{children}</Box>;
  }

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => onKeyChange(target.value);

  return (
    <Box className={classNames} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          size="small"
          variant="outlined"
          onBlur={handleBlur}
          defaultValue={label}
          disabled={disabled || readonly}
          id={`${id}-key`}
          sx={{ flexGrow: 1 }}
        />
        {children}
        <IconButton size="small" color="error" onClick={onDropPropertyClick(label)} title="删除">
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default WrapIfAdditionalTemplate;
