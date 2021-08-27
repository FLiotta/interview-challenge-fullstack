// @Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cookie from 'universal-cookie';
import cogoToast from 'cogo-toast';

// @Project
import AuthService from 'services/auth';
import { reconnect } from 'actions/session';
import store from 'store';
import AppRouter from 'routes/AppRouter';

// @Own
import './index.scss';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

// @Initialization
const cookie = new Cookie();

const refreshToken = cookie.get('refresh_token');

if(refreshToken) {
  AuthService.refresh(refreshToken)
    .then((resp: AxiosResponse) => {
      cookie.set('token', resp.data.access);
      cookie.set('refresh_token', refreshToken);
      
      const decoded_token: any = jwtDecode(resp.data.access);
      const payloadToReconnect: any = {
        ...decoded_token,
        token: resp.data.access,
        refresh_token: refreshToken
      }
      store.dispatch(reconnect(payloadToReconnect));

      cogoToast.success('Bienvenido devuelta!', {
        position: 'bottom-right'
      })
    })
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);