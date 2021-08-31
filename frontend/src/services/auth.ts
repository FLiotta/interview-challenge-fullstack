// @Project
import ApiService from './api';

export interface SignupPayload {
  username: string,
  first_name: string,
  last_name: string
  email: string,
  password: string
}

class AuthService extends ApiService {
  login(username: string, password: string) {
    return this.post('/token', { username, password });
  }

  signup(payload: SignupPayload) {
    return this.post('/signup', payload);
  }

  refresh(refreshToken: string) {
    return this.post('/token/refresh', { refresh: refreshToken });
  }
}

export default new AuthService();