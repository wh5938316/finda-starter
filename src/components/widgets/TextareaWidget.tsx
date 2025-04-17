import { TextField } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';

const TextareaWidget = ({
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
    multiline
    minRows={4}
    fullWidth
    onBlur={onBlur ? (event) => onBlur(id, event.target.value) : undefined}
    onFocus={onFocus ? (event) => onFocus(id, event.target.value) : undefined}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default TextareaWidget;
