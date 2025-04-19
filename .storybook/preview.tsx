import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Preview } from '@storybook/react';
import { ConfirmProvider } from 'material-ui-confirm';
import * as React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

import createEmotionCache from '../src/components/themeRegistry/createEmotionCache';
import { MuiProvider, getTheme } from '../src/theme';

// 创建自定义ThemeRegistry组件
const CustomThemeRegistry = ({
  children,
  isDarkMode,
}: React.PropsWithChildren<{ isDarkMode: boolean }>) => {
  const cache = createEmotionCache();

  // 创建主题，基于isDarkMode参数
  const theme = React.useMemo(() => {
    return createTheme({
      cssVariables: {
        colorSchemeSelector: 'class',
      },
      colorSchemes: {
        light: getTheme().colorSchemes?.light,
        dark: getTheme().colorSchemes?.dark,
      },
      // 设置当前模式
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
      },
    });
  }, [isDarkMode]);

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
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      current: 'light',
      darkClass: 'dark-mode',
      lightClass: 'light-mode',
      classTarget: 'html',
      stylePreview: true,
    },
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story) => {
      // 将useDarkMode钩子移到decorators内部调用
      const isDarkMode = useDarkMode();

      return (
        <CustomThemeRegistry isDarkMode={isDarkMode}>
          <Story />
        </CustomThemeRegistry>
      );
    },
  ],
};

export default preview;
