// @Project
import ApiService from './api';

class ProfileService extends ApiService {
  getAllAccounts() {
    return this.get('/account');
  }

  create(currency_id: number, name?: string) {
    return this.post('/account', { currency_id, name });
  }

  getAccountOperations(accountId: number) {
    return this.get(`/account/${accountId}/operations`);
  }

  deposit(accountId: number | string, amount: number) {
    return this.patch(`/account/${accountId}/deposit`, { amount })
  }
}

export default new ProfileService();