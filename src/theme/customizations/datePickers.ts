import { menuItemClasses } from '@mui/material/MenuItem';
import type { Theme } from '@mui/material/styles';
import { pickersDayClasses } from '@mui/x-date-pickers';
import { monthCalendarClasses } from '@mui/x-date-pickers/MonthCalendar';
import { yearCalendarClasses } from '@mui/x-date-pickers/YearCalendar';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';

import { gray } from '../themePrimitives';

const datePickersCustomizations: PickerComponents<Theme> = {
  MuiPickerPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        ...theme.applyStyles('dark', {
          // background: gray[900],
          background: theme.vars.palette.background.surface,
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }),
      }),
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: ({ theme }) => ({
        backgroundColor: 'transparent',
        color: theme.palette.grey[500],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[400],
        }),
      }),
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: {
        padding: 0,
        border: 'none',
      },
    },
  },
  MuiMonthCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        [`&.${monthCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${theme.palette.primary.light}`,
          outlineOffset: '0px',
          backgroundColor: 'transparent',
          [`&.${monthCalendarClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[300],
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          [`&.${monthCalendarClasses.selected}`]: {
            color: theme.palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${theme.palette.primary.light}`,
            outlineOffset: '0px',
            backgroundColor: 'transparent',
            [`&.${monthCalendarClasses.selected}`]: {
              backgroundColor: gray[300],
            },
          },
        }),
      }),
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${theme.palette.primary.light}`,
          outlineOffset: '0px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[300],
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          [`&.${yearCalendarClasses.selected}`]: {
            color: theme.palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${theme.palette.primary.light}`,
            outlineOffset: '0px',
            backgroundColor: 'transparent',
            [`&.${yearCalendarClasses.selected}`]: {
              backgroundColor: gray[300],
            },
          },
        }),
      }),
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.grey[600],
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        [`&.${pickersDayClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          outline: `3px solid ${theme.palette.primary.light}`,
          outlineOffset: '0px',
          backgroundColor: 'transparent',
          [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[700] },
        },
        ...theme.applyStyles('dark', {
          color: theme.vars.palette.text.secondary,
          '&:hover': {
            backgroundColor: theme.vars.palette.action.hover,
          },
          [`&.${pickersDayClasses.selected}`]: {
            color: theme.vars.palette.common.black,
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: theme.vars.palette.background.control,
          },
          '&:focus': {
            outline: `3px solid ${theme.palette.primary.light}`,
            outlineOffset: '0px',
            backgroundColor: 'transparent',
            [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[300] },
          },
        }),
      }),
    },
  },
};

export { datePickersCustomizations };
