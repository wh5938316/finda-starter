import {
  buttonClasses,
  formControlLabelClasses,
  iconButtonClasses,
  inputAdornmentClasses,
  inputLabelClasses,
  switchClasses,
} from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { Components, Theme, alpha } from '@mui/material/styles';

// import { DeleteIcon, ExpandMoreIcon } from '@finda-co/icons';
import { brand, gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: theme.shape.borderRadius,
        textTransform: 'none',
        [`& .${svgIconClasses.root}`]: {
          fill: 'currentColor',
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2rem',
              padding: '8px 12px',
              fontWeight: 600,
              [`& .${svgIconClasses.root}`]: {
                fontSize: '1rem',
              },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              fontWeight: 700,
              height: '2.25rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[800],
              // backgroundImage: `linear-gradient(to bottom, ${brand[700]}, ${brand[800]})`,
              // boxShadow: `inset 0 1px 0 ${brand[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              [`&:not(.${buttonClasses.disabled})`]: {
                border: `1px solid ${brand[700]}`,
              },
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: brand[900],
              },
              ...theme.applyStyles('dark', {
                color: 'black',
                backgroundColor: gray[50],
                // backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                boxShadow: 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                border: `1px solid ${gray[50]}`,
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: gray[300],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: gray[400],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              '&:hover': {
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: brand[700],
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: theme.palette.text.primary,
              border: '1px solid',
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: gray[800],
                borderColor: gray[700],

                '&:hover': {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: brand[700],
              border: '1px solid',
              borderColor: brand[200],
              backgroundColor: brand[50],
              '&:hover': {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[50],
                border: '1px solid',
                borderColor: brand[900],
                backgroundColor: alpha(brand[900], 0.3),
                '&:hover': {
                  borderColor: brand[700],
                  backgroundColor: alpha(brand[900], 0.6),
                },
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: gray[600],
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[700],
                },
                '&:active': {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: brand[700],
              '&:hover': {
                backgroundColor: alpha(brand[100], 0.5),
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[100],
                '&:hover': {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(brand[900], 0.3),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
              size: 'small',
            },
            style: {
              paddingLeft: 12,
              paddingRight: 12,
            },
          },
          {
            props: {
              variant: 'text',
              size: 'medium',
            },
            style: {
              paddingLeft: 16,
              paddingRight: 16,
            },
          },
          {
            props: {
              variant: 'soft',
              color: 'primary',
            },
            style: {
              color: brand[700],
              backgroundColor: alpha(brand[100], 0.5),
              '&:hover': {
                backgroundColor: alpha(brand[200], 0.5),
              },
              '&:active': {
                color: brand[800],
                backgroundColor: alpha(brand[200], 0.9),
              },
              [`&.${buttonClasses.disabled}`]: {
                backgroundColor: alpha(gray[100], 0.5),
              },
              ...theme.applyStyles('dark', {
                color: brand[100],
                backgroundColor: alpha(brand[800], 0.5),
                '&:hover': {
                  backgroundColor: alpha(brand[800], 0.7),
                },
                '&:active': {
                  backgroundColor: alpha(brand[800], 0.5),
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: {
              variant: 'soft',
            },
            style: {
              boxShadow: 'none',
              borderRadius: theme.shape.borderRadius,
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightMedium,
              letterSpacing: 0,
              color: theme.palette.text.primary,
              backgroundColor: alpha(gray[300], 0.5),
              '&:hover': {
                backgroundColor: alpha(gray[300], 0.7),
              },
              '&:active': {
                color: gray[800],
                backgroundColor: alpha(gray[300], 0.9),
              },
              ...theme.applyStyles('dark', {
                color: gray[100],
                backgroundColor: alpha(gray[800], 0.5),
                '&:hover': {
                  backgroundColor: alpha(gray[800], 0.7),
                },
                '&:active': {
                  backgroundColor: alpha(gray[800], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              boxShadow: 'none',
              borderRadius: theme.shape.borderRadius,
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightMedium,
              letterSpacing: 0,
              color: theme.palette.text.primary,
              border: '1px solid ',
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: gray[800],
                borderColor: gray[700],
                '&:hover': {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2rem',
              height: '2rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        ...theme.applyStyles('dark', {
          color: gray[400],
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 0,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: '1px solid ',
        borderColor: alpha(gray[300], 0.8),
        boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
        backgroundColor: alpha(gray[100], 0.4),
        transition: 'border-color, background-color, 120ms ease-in',
        '&:hover': {
          borderColor: brand[300],
        },
        '&.Mui-focusVisible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          borderColor: brand[400],
        },
        '&:not(.Mui-disabled)': {
          '&.Mui-checked': {
            color: 'white',
            backgroundColor: brand[500],
            borderColor: brand[500],
            boxShadow: `none`,
            '&:hover': {
              backgroundColor: brand[600],
            },
          },
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              padding: 6,
              [`& .${svgIconClasses.root}`]: {
                width: '0.75rem',
                height: '0.75rem',
              },
            },
          },
        ],
        ...theme.applyStyles('dark', {
          borderColor: alpha(gray[700], 0.8),
          boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
          backgroundColor: alpha(gray[900], 0.8),
          '&:hover': {
            borderColor: brand[300],
          },
          '&.Mui-focusVisible': {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          opacity: 0.7,
          color: gray[500],
        },
        variants: [
          {
            props: {
              size: 'medium',
            },
            style: {
              height: 18,
            },
          },
        ],
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '8px 12px',
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        transition: 'border 120ms ease-in',
        '&:hover': {
          borderColor: gray[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          borderColor: brand[400],
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: gray[500],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              // minHeight: '2.25rem',
              paddingTop: 4.5,
              paddingBottom: 4.5,
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              [`&:not(.MuiInputBase-multiline})`]: {
                height: '2.5rem',
              },
              [`& .${inputAdornmentClasses.root}`]: {
                width: '40px',
                height: '18px',
              },
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${iconButtonClasses.root}`]: {
          border: 0,
          width: '100%',
          height: '100%',
          color: theme.palette.grey[500],
          ...theme.applyStyles('dark', {
            color: theme.palette.grey[400],
          }),
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`&.${inputLabelClasses.root}`]: {
          // fontSize: theme.typography.body2.fontSize,
          position: 'relative',
          transform: 'none',
        },

        display: 'block',
        fontSize: theme.typography.body1.fontSize,
        marginBottom: 6,
        '&.Mui-focused': {
          color: `${theme.palette.text.primary}`,
          transform: 'none',
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({}),
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      endAdornment: ({ theme }) => ({
        [`& .${autocompleteClasses.clearIndicator}`]: {
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        [`& .${autocompleteClasses.popupIndicator}`]: {
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }),
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              padding: 8,
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              padding: 8,
              [`& .${svgIconClasses.root}`]: {
                width: theme.typography.pxToRem(20),
                height: theme.typography.pxToRem(20),
              },
            },
          },
        ],
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 32,
        height: 20,
        padding: 0,
        display: 'flex',
        '&:active': {
          [`& .${switchClasses.thumb}`]: {
            width: 19,
          },
          [`& .${switchClasses.switchBase}.Mui-checked`]: {
            transform: 'translateX(9px)',
          },
        },
      },
      switchBase: {
        padding: 2,
        '&.Mui-checked': {
          transform: 'translateX(12px)',
          color: '#fff',
          [`& + .${switchClasses.track}`]: {
            opacity: 1,
            backgroundColor: brand[500],
          },
        },
      },
      thumb: ({ theme }) => ({
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16,
        height: 16,
        borderRadius: 8,
        transition: theme.transitions.create('width', {
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }),
      }),
      track: {
        borderRadius: 20 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, .25)',
        boxSizing: 'border-box',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: 0,
        gap: 12,
      },
    },
  },
  MuiFormGroup: {
    styleOverrides: {
      root: {
        [`& .${formControlLabelClasses.root}`]: {
          marginLeft: -9,
        },
      },
    },
  },
};
