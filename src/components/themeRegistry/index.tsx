import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import * as React from 'react';

import { getTheme,MuiProvider } from '@/theme';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  ...getTheme('light'),
});

export default function ThemeRegistry({ children }: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider theme={theme}>
      <MuiProvider>
        <CssBaseline />
        <ConfirmProvider
          defaultOptions={{
            confirmationText: 'Confirm',
            confirmationButtonProps: {
              variant: 'contained',
            },
          }}
        >
          {children}
        </ConfirmProvider>
      </MuiProvider>
    </ThemeProvider>
  );
}
