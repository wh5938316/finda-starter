import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import * as React from 'react';

const RadioWidget = ({ id, options, value, disabled, readonly, onChange }: WidgetProps) => {
  const { enumOptions } = options;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset" disabled={disabled || readonly}>
      <RadioGroup value={value || ''} onChange={handleChange} name={id}>
        {enumOptions?.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioWidget;
