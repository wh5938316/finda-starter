import { tableRowClasses } from '@mui/material';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { svgIconClasses } from '@mui/material/SvgIcon';
import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import { gray, green, red } from '../themePrimitives';

const dataDisplayCustomizations: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        [`& .${svgIconClasses.root}`]: {
          fontSize: '1rem',
          fill: 'currentColor',
          color: 'inherit',
        },
        [`& .${buttonBaseClasses.root}`]: {},
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        gap: 8,
        padding: '2px 8px',
        borderRadius: theme.shape.borderRadius,
        '&.Mui-nested': {
          paddingLeft: '36px',
          opacity: 0.8,
          fontWeight: 400,
        },
        '&.Mui-selected': {
          opacity: 1,
          backgroundColor: alpha(theme.palette.action.selected, 0.8),
          // [`& .${svgIconClasses.root}`]: {
          //   color: theme.palette.text.primary,
          // },
          '&:focus-visible': {
            backgroundColor: theme.palette.action.selected,
          },
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
        },
        '&:focus-visible': {
          backgroundColor: 'transparent',
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        // fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        // lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: 'inherit',
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: '1px solid',
        borderRadius: '999px',
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: 'default',
            },
            style: {
              borderColor: gray[200],
              backgroundColor: gray[100],
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: gray[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: gray[700],
                backgroundColor: gray[800],
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: gray[300],
                },
              }),
            },
          },
          {
            props: {
              color: 'success',
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
              }),
            },
          },
          {
            props: {
              color: 'error',
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              ...theme.applyStyles('dark', {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
              }),
            },
          },
          {
            props: { size: 'small' },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: 'medium' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fill: 'currentColor',
        color: 'inherit',
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.vars.palette.text.primary,
        backgroundColor: theme.vars.palette.background.control,
        variants: [
          {
            props: {
              variant: 'square',
            },
            style: {
              borderRadius: `calc(0.75 * ${theme.vars.shape.borderRadius})`,
              border: `1px solid ${theme.palette.divider}`,
              ...theme.applyStyles('dark', {
                // border: `1px solid ${theme.vars.palette.background.paper}`,
                backgroundColor: theme.vars.palette.background.control,
              }),
            },
          },
        ],
      }),
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        '--Table-Cell-height': '40px',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      }),
      head: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`&:not(.${tableRowClasses.head})`]: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }),
    },
  },
};

export { dataDisplayCustomizations };
