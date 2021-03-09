import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth-provider-with-history';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);
