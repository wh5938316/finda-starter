import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import type { ChangeEvent } from 'react';

const CheckboxesWidget = ({ id, options, value, disabled, readonly, onChange }: WidgetProps) => {
  const { enumOptions, inline } = options;

  const _onChange =
    (option: any) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      const newValue = [...(value || [])];
      if (checked) {
        newValue.push(option.value);
      } else {
        newValue.splice(newValue.indexOf(option.value), 1);
      }
      onChange(newValue);
    };

  return (
    <FormGroup row={inline}>
      {enumOptions?.map((option: any, index: number) => {
        const checked = value && value.includes(option.value);
        const itemDisabled = disabled || readonly;

        return (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                id={`${id}_${index}`}
                checked={checked}
                disabled={itemDisabled}
                onChange={_onChange(option)}
              />
            }
            label={option.label}
          />
        );
      })}
    </FormGroup>
  );
};

export default CheckboxesWidget;
