import { TextField } from '@mui/material';
import type { BaseInputTemplateProps } from '@rjsf/utils';
import * as React from 'react';

const BaseInputTemplate = ({
  id,
  placeholder,
  required,
  readonly,
  disabled,
  type,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
  label,
}: BaseInputTemplateProps) => {
  const inputValue = value || value === 0 ? value : '';

  const handleChange = ({ target: { value: val } }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(val === '' ? options.emptyValue : val);
  };

  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      slotProps={{
        input: {
          readOnly: readonly,
        },
      }}
      type={type}
      value={inputValue}
      onChange={handleChange}
      onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
      onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
      autoFocus={autofocus}
      fullWidth
      size="small"
      margin="dense"
    />
  );
};

export default BaseInputTemplate;
