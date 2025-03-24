import { ThemeProvider, createTheme, extendTheme } from '@mui/material/styles';
import type { Preview } from '@storybook/react';
import '@storybook/react';
import React from 'react';

import getTheme from '../src/getTheme';

const preview: Preview = {
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      const theme = createTheme({
        cssVariables: true,
        ...getTheme('light'),
      });

      // 👇 Make it configurable by reading from parameters
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
