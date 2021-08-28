// @Project
import ApiService from './api';

class ProfileService extends ApiService {
  getAllAccounts() {
    return this.get('/account');
  }

  deposit(accountId: number, amount: number) {
    return this.patch(`/account/${accountId}/deposit`, { amount })
  }
}

export default new ProfileService();