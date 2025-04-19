import type { PaletteMode, Shadows } from '@mui/material/styles';
import { alpha, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const brand = {
  50: 'hsl(6, 71%, 95%)',
  100: 'hsl(14, 100%, 87%)',
  200: 'hsl(14, 100%, 78%)',
  300: 'hsl(14, 100%, 70%)',
  400: 'hsl(14, 100%, 63%)',
  500: 'hsl(14, 100%, 56.67%)',
  600: 'hsl(14, 90.68%, 53.73%)',
  700: 'hsl(14, 80.39%, 50%)',
  800: 'hsl(14, 82.28%, 46.47%)',
  900: 'hsl(14, 88.18%, 39.8%)',
  // 50: 'hsl(210, 100%, 95%)',
  // 100: 'hsl(210, 100%, 92%)',
  // 200: 'hsl(210, 100%, 80%)',
  // 300: 'hsl(210, 100%, 65%)',
  // 400: 'hsl(210, 98%, 48%)',
  // 500: 'hsl(210, 98%, 42%)',
  // 600: 'hsl(210, 98%, 55%)',
  // 700: 'hsl(210, 100%, 35%)',
  // 800: 'hsl(210, 100%, 16%)',
  // 900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const blue = {
  50: 'hsl(199, 94%, 94%)',
  100: 'hsl(199, 92%, 85%)',
  200: 'hsl(199, 92%, 74%)',
  300: 'hsl(199, 91%, 64%)',
  400: 'hsl(199, 92%, 56%)',
  500: 'hsl(199, 97%, 48%)',
  600: 'hsl(199, 97%, 45%)',
  700: 'hsl(201, 98%, 41%)',
  800: 'hsl(202, 98%, 37%)',
  900: 'hsl(206, 99%, 31%)',
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[300],
      main: brand[700],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === 'dark' && {
        contrastText: brand[50],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      }),
      ...brand,
    },
    info: {
      light: blue[200],
      main: blue[400],
      dark: blue[700],
      contrastText: gray[50],
      ...(mode === 'dark' && {
        contrastText: blue[300],
        light: blue[300],
        main: blue[400],
        dark: blue[700],
      }),
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      ...(mode === 'dark' && {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      }),
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      ...(mode === 'dark' && {
        light: red[400],
        main: red[500],
        dark: red[700],
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === 'dark' && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
      ...green,
    },
    grey: {
      ...gray,
    },
    divider: mode === 'dark' ? 'hsl(0, 0%, 18%)' : alpha(gray[300], 0.6),
    // divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.6),

    //#141414 background
    //#181818 paper
    //#1f1f1f surface
    //#1c1c1c control
    background: {
      default: 'hsl(0, 0.00%, 100.00%)',
      background: 'hsl(0, 0.00%, 100.00%)',
      surface: 'hsl(0, 0.00%, 96.00%)',
      paper: 'hsl(0, 0.00%, 92.00%)',
      control: 'hsl(0, 0.00%, 88.00%)',
      controlChannel: '224, 224, 224',
      ...(mode === 'dark' && {
        default: 'hsl(0, 0.00%, 5.00%)',
        background: 'hsl(0, 0.00%, 5.00%)',
        surface: 'hsl(0, 0.00%, 9.00%)',
        paper: 'hsl(0, 0.00%, 11.00%)',
        control: 'hsl(0, 0.00%, 12.00%)',
        controlChannel: '31, 31, 31',
      }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      warning: orange[400],
      ...(mode === 'dark' && {
        primary: 'hsl(0, 0%, 95%)',
        secondary: 'hsl(0, 0%, 60%)',
      }),
    },
    action: {
      hover: alpha(gray[200], 0.4),
      selected: `${alpha(gray[200], 0.6)}`,
      ...(mode === 'dark' && {
        // hover: alpha(gray[600], 0.4),
        hover: 'hsl(0, 0%, 14%)',
        selected: alpha(gray[600], 0.6),
        active: 'hsl(0, 0%, 24%)',
      }),
    },
    Tooltip: {
      bg: gray[800],
      ...(mode === 'dark' && {
        bg: gray[600],
      }),
    },
  },
  typography: {
    fontFamily: ['var(--font-inter)', 'sans-serif'].join(','),
    h1: {
      fontSize: defaultTheme.typography.pxToRem(48),
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: defaultTheme.typography.pxToRem(36),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(30),
      lineHeight: 1.2,
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(24),
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(20),
      fontWeight: 600,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(18),
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(16),
    },
    subtitle2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 500,
    },
    body1: {
      fontSize: defaultTheme.typography.pxToRem(14),
      fontWeight: 400,
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(13),
      fontWeight: 400,
    },
    caption: {
      fontSize: defaultTheme.typography.pxToRem(12),
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: customShadows,
});
