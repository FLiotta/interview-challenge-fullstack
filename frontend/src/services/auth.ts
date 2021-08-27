// @Project
import ApiService from './api';

class AuthService extends ApiService {
  login(username: string, password: string) {
    return this.post('/token', { username, password });
  }

  refresh(refreshToken: string) {
    return this.post('/token/refresh', { refresh: refreshToken });
  }
}

export default new AuthService();