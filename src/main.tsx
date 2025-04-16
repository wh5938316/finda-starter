import './styles/fonts.css';

import * as React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import ThemeRegistry from './components/themeRegistry';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeRegistry>
      <App />
    </ThemeRegistry>
  </React.StrictMode>,
);
