import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import ThemeRegistry from './components/themeRegistry';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      body: {
        '--font-inter': '"inter", "inter Fallback"',
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeRegistry>
      {inputGlobalStyles}
      <App />
    </ThemeRegistry>
  </React.StrictMode>,
);
