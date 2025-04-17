import { FormControlLabel, Switch } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import * as React from 'react';

const SwitchWidget = ({ id, label, value, disabled, readonly, onChange }: WidgetProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          id={id}
          checked={value || false}
          disabled={disabled || readonly}
          onChange={handleChange}
        />
      }
      label={label || ''}
    />
  );
};

export default SwitchWidget;
