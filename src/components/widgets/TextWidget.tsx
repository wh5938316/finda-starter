// src/widgets/TextWidget.tsx
import { TextField } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import * as React from 'react';

const TextWidget = ({
  id,
  placeholder,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  onBlur,
  onFocus,
  onChange,
}: WidgetProps) => (
  <TextField
    id={id}
    placeholder={placeholder}
    value={value || ''}
    required={required}
    disabled={disabled || readonly}
    autoFocus={autofocus}
    fullWidth
    onBlur={(event: React.FocusEvent<HTMLInputElement>) => onBlur && onBlur(id, event.target.value)}
    onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
      onFocus && onFocus(id, event.target.value)
    }
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
  />
);

export default TextWidget;
