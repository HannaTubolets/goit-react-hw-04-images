import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
// import { Global, ThemeProvider } from '@emotion/react';
// import { GlobalStyles } from 'styles/GlobalStyles';
import 'modern-normalize/modern-normalize.css';
// import { theme } from './styles/theme';
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
