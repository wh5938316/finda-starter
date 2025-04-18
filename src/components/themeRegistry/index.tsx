import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import * as React from 'react';

import createEmotionCache from './createEmotionCache';
import { MuiProvider, getTheme } from '@/theme';

const cache = createEmotionCache();

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  ...getTheme(),
});

export default function ThemeRegistry({ children }: React.PropsWithChildren<{}>) {
  return (
    <CacheProvider value={cache}>
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
    </CacheProvider>
  );
}
