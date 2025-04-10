import type { Components, Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

import { gray } from '../themePrimitives';

const surfacesCustomizations: Components<Theme> = {
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        overflow: 'clip',
        backgroundColor: theme.palette.background.default,
        border: '1px solid',
        borderColor: theme.palette.divider,
        ':before': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none',
        },
        '&:first-of-type': {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        borderRadius: 8,
        '&:hover': { backgroundColor: gray[50] },
        '&:focus-visible': { backgroundColor: 'transparent' },
        ...theme.applyStyles('dark', {
          '&:hover': { backgroundColor: gray[800] },
        }),
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: 16,
        transition: 'all 100ms ease',
        backgroundColor: gray[50],
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        ...theme.applyStyles('dark', {
          backgroundColor: gray[800],
        }),
        variants: [
          {
            props: {
              variant: 'outlined',
            },
            style: {
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none',
              background: 'hsl(0, 0%, 100%)',
              ...theme.applyStyles('dark', {
                background: alpha(gray[900], 0.4),
              }),
            },
          },
        ],
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 16,
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: '0px 16px 16px',
        margin: '0 -16px',
      },
      title: ({ theme }) => ({
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: 12,
      }),
      subheader: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.text.secondary,
        lineHeight: theme.typography.body1.lineHeight,
      }),
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: '16px 0 0',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: {
              variant: 'popper',
            },
            style: {
              boxShadow:
                'rgba(28, 40, 64, 0.04) 0px 0px 0px 1px, rgba(28, 40, 64, 0.12) 0px 4px 8px -4px, rgba(28, 40, 64, 0.16) 0px 4px 12px -2px',
              backgroundColor: theme.palette.background.default,
            },
          },
        ],
      }),
    },
  },
};

export default surfacesCustomizations;
