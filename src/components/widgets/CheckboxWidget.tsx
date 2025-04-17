import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import type { ChangeEvent } from 'react';

interface EnumOption {
  const?: string | number;
  title?: string;
  value: string | number;
  label: string;
}

const CheckboxWidget = ({
  id,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  options,
  schema,
}: WidgetProps) => {
  const { inline } = options;

  // 处理多选模式
  if (schema.type === 'array') {
    return (
      <FormGroup row={inline}>
        {(options.enumOptions as EnumOption[])?.map((option, index) => {
          // 使用 const 作为值，title 作为显示文本
          const optionValue = option.const ?? option.value;
          const optionLabel = option.title ?? option.label;
          const checked = Array.isArray(value) && value.includes(optionValue);
          const itemDisabled = disabled || readonly;

          const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
            const newValue = [...(value || [])];
            if (checked) {
              newValue.push(optionValue);
            } else {
              newValue.splice(newValue.indexOf(optionValue), 1);
            }
            onChange(newValue);
          };

          return (
            <FormControlLabel
              key={`${id}_${option.value}`}
              control={
                <Checkbox
                  id={`${id}_${index}`}
                  checked={checked}
                  disabled={itemDisabled}
                  onChange={_onChange}
                />
              }
              label={label ?? optionLabel}
            />
          );
        })}
      </FormGroup>
    );
  }

  // 处理单选模式
  const _onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    onChange(checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={value || false}
          required={required}
          disabled={disabled || readonly}
          onChange={_onChange}
        />
      }
      label={label || ''}
    />
  );
};

export default CheckboxWidget;
