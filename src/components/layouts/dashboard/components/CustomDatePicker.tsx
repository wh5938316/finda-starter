import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { DatePickerFieldProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { usePickerContext } from '@mui/x-date-pickers/hooks';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import * as React from 'react';

interface ButtonFieldProps extends DatePickerFieldProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const { setOpen, id } = props;

  const pickerContext = usePickerContext();

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={pickerContext.disabled}
      ref={pickerContext.triggerRef}
      // aria-label={props.}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content' }}
    >
      {pickerContext.label ? `${pickerContext.label}` : 'Pick a date'}
    </Button>
  );
}

export default function CustomDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-04-17'));
  const [open, setOpen] = React.useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        label={value == null ? null : value.format('MMM DD, YYYY')}
        onChange={(newValue) => setValue(newValue)}
        slots={{ field: ButtonField }}
        slotProps={{
          field: { setOpen } as any,
          nextIconButton: { size: 'small' },
          previousIconButton: { size: 'small' },
          // desktopPaper: {
          //   variant: "popper",
          // }
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        views={['day', 'month', 'year']}
      />
    </LocalizationProvider>
  );
}
