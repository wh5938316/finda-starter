import { tooltipClasses } from '@mui/material/Tooltip';
import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import { gray, green, orange } from '../themePrimitives';

const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: () => ({
        borderRadius: 8,
        fontWeight: 400,
        variants: [
          {
            props: { variant: 'outlined', severity: 'success' },
            style: {
              backgroundColor: alpha(green[300], 0.2),
              color: green[500],
              border: `1px solid ${alpha(green[500], 0.5)}`,
              '& .MuiAlert-icon': {
                color: green[500],
              },
            },
          },
          {
            props: { variant: 'outlined', severity: 'warning' },
            style: {
              backgroundColor: alpha(orange[300], 0.2),
              color: orange[500],
              border: `1px solid ${alpha(orange[500], 0.5)}`,
              '& .MuiAlert-icon': {
                color: orange[500],
              },
            },
          },
        ],
        // backgroundColor: orange[100],
        // color: theme.palette.text.primary,
        // border: `1px solid ${alpha(orange[300], 0.5)}`,
        // '& .MuiAlert-icon': {
        //   color: orange[500],
        // },
        // ...theme.applyStyles('dark', {
        //   backgroundColor: `${alpha(orange[900], 0.5)}`,
        //   border: `1px solid ${alpha(orange[800], 0.5)}`,
        // }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        },
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '16px 24px',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
      }),
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        variants: [
          {
            props: { variant: 'tooltip' },
            style: {
              color: theme.palette.common.white,
            },
          },
          {
            props: { variant: 'card' },
            style: {
              ['--mui-palette-Tooltip-bg']: theme.palette.background.paper,
              fontSize: 'unset',
              fontWeight: 'unset',
              padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              borderWidth: '1px 0px 0px',
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[3],
              [`& .${tooltipClasses.arrow}:before`]: {
                border: `1px solid ${theme.palette.divider}`,
              },
            },
          },
        ],
      }),
    },
  },
};

export { feedbackCustomizations };
