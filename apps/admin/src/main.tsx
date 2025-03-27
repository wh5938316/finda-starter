import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import ThemeRegistry from './components/themeRegistry';
import Layout from './components/layouts/dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <Layout>
        <App />
      </Layout>
    </ThemeRegistry>
  </React.StrictMode>,
);
