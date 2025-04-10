/// <reference types="material-ui-toaster/types" />
import type { OverridableStringUnion } from '@mui/types';

declare module '@mui/material/styles/createPalette' {
  interface Theme {
    background: {
      softBlack: string;
      warmWhite: string;
    };
  }

  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonOwnProps {
    variant?: OverridableStringUnion<'soft' | 'outlined', {}>;
  }
}

declare module '@mui/material/Tooltip' {
  interface TooltipProps {
    variant?: OverridableStringUnion<'tooltip' | 'card', {}>;
  }
}

declare module '@mui/material/Link' {
  interface LinkOwnProps {
    underline?: 'none' | 'hover' | 'always' | 'fade';
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    popper: true;
  }
}
