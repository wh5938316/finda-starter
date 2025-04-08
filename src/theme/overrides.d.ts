import { OverridableStringUnion } from '@mui/types';
import { ToasterProps } from '../components/Toaster/Toaster';
import { ToastProps } from '../components/Toaster/Toast';

declare module '@mui/material/styles' {
  interface TypeBackground {
    softBlack: string;
    warmWhite: string;
  }

  interface ComponentsPropsList {
    MuiToaster: ToasterProps;
    MuiToast: ToastProps;
  }

  interface ComponentsOverrides {
    MuiToaster: ComponentsOverridesReturnType['MuiToaster'];
    MuiToast: ComponentsOverridesReturnType['MuiToast'];
  }

  interface ComponentsVariants {
    MuiToaster: {
      props: { position?: ToasterProps['position']; expand?: boolean };
      style: React.CSSProperties;
    }[];
    MuiToast: {
      props: { type?: ToastProps['type'] };
      style: React.CSSProperties;
    }[];
  }
}

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

  interface PaletteColor extends ColorRange { }
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
