import type { SxProps, Theme } from '@mui/material/styles';
import '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material-pigment-css' {
  interface ThemeArguments {
    theme: Theme;
  }
}

declare global {
  namespace React {
    interface HTMLAttributes {
      sx?: SxProps<Theme>;
    }
    interface SVGProperties {
      sx?: SxProps<Theme>;
    }
  }
}
