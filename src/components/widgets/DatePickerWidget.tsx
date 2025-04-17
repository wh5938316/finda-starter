import { CalendarToday } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import type { WidgetProps } from '@rjsf/utils';
import { format, parse } from 'date-fns';

const DatePickerWidget = ({
  id,
  value,
  disabled,
  readonly,
  placeholder,
  onChange,
}: WidgetProps) => {
  const formattedValue = value ? format(new Date(value), 'yyyy-MM-dd') : '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    try {
      if (newValue) {
        const date = parse(newValue, 'yyyy-MM-dd', new Date());
        onChange(format(date, 'yyyy-MM-dd'));
      } else {
        onChange(null);
      }
    } catch (error) {
      // 输入格式错误时不改变值
      console.error('无效的日期格式', error);
    }
  };

  return (
    <TextField
      id={id}
      type="date"
      value={formattedValue}
      onChange={handleChange}
      disabled={disabled || readonly}
      placeholder={placeholder || 'YYYY-MM-DD'}
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <CalendarToday fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default DatePickerWidget;
