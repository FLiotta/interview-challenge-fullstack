// @Packages
import { ThunkDispatch } from 'redux-thunk';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import Cookie from 'universal-cookie';

// @Project
import AuthService from 'services/auth';
import { IThunkDispatch } from 'interfaces';

// @Initialization
const cookie = new Cookie();

export const SESSION_LOG_IN = '[SESSION] LOG IN';
export const SESSION_RECONNECT = '[SESSION] RECONNECT';
export const SESSION_DISCONNECT = '[SESSION] DISCONNECT';

export const logIn = (username: string, password: string) => {
  return (dispatch: IThunkDispatch) => {

    return AuthService.login(username, password)
      .then((resp: AxiosResponse) => {
        cookie.set('token', resp.data.access);
        cookie.set('refresh_token', resp.data.refresh);
        
        const decoded_token: any = jwtDecode(resp.data.access);

        dispatch({
          type: SESSION_LOG_IN,
          payload: {
            token: resp.data.access,
            refresh_token: resp.data.refresh,
            id: decoded_token.user_id
          }
        });
      })
  }
}

export const reconnect = (sessionPayload: any) => ({
  type: SESSION_RECONNECT,
  payload: sessionPayload
})

export const disconnect = () => {
  cookie.remove('token');
  cookie.remove('refresh_token');

  return {
    type: SESSION_DISCONNECT
  }
}