// @Project
import ApiService from './api';

class ProfileService extends ApiService {
  myProfile() {
    return this.get('/profile');
  }
}

export default new ProfileService();