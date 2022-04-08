import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { ContextProvider } from './Context';
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        {/* <ContextProvider> */}
            <App />
        {/* </ContextProvider> */}
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
