// @Project
import ApiService from './api';

class ProfileService extends ApiService {
  getAllAccounts() {
    return this.get('/account');
  }

  getAccountOperations(accountId: number) {
    return this.get(`/account/${accountId}/operations`);
  }

  deposit(accountId: number | string, amount: number) {
    return this.patch(`/account/${accountId}/deposit`, { amount })
  }
}

export default new ProfileService();