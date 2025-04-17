import type { SelectChangeEvent } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';

const SelectWidget = ({
  id,
  options,
  value,
  disabled,
  readonly,
  placeholder,
  onChange,
}: WidgetProps) => {
  const { enumOptions } = options;

  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth disabled={disabled || readonly}>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value || ''}
        onChange={handleChange}
        displayEmpty
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder || '请选择'}
          </MenuItem>
        )}
        {enumOptions?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectWidget;
