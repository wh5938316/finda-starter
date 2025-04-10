import '@mui/material/themeCssVarsAugmentation';

import type { SxProps, Theme } from '@mui/material/styles';

declare module '@mui/material-pigment-css' {
  interface ThemeArgs {
    theme: Theme;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes {
      sx?: SxProps<Theme>;
    }
    interface SVGProps {
      sx?: SxProps<Theme>;
    }
  }
}
