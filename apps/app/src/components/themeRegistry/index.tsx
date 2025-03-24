'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';

import { getTheme } from '@finda-co/theme';
import MuiProvider from '@finda-co/theme/mui-provider';

const theme = createTheme({
  cssVariables: true,
  ...getTheme('light'),
});

export default function ThemeRegistry({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MuiProvider>
          <CssBaseline />
          <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
          </SnackbarProvider>
        </MuiProvider>
      </ThemeProvider>
    </>
  );
}
