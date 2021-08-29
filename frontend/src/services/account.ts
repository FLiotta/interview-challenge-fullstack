// @Project
import ApiService from './api';

class ProfileService extends ApiService {
  getAllAccounts() {
    return this.get('/account');
  }

  create(currency_id: number, name?: string) {
    return this.post('/account', { currency_id, name });
  }

  transfer(accountId: number, amount: number, depositAddress: string) {
    return this.post(`/account/${accountId}/send`, {
      deposit_address: depositAddress,
      amount
    })
  }

  getAccountOperations(accountId: number, page?: number, limit?: number) {
    return this.get(`/account/${accountId}/operations`, {
      params: { limit, page }
    });
  }

  deposit(accountId: number | string, amount: number) {
    return this.patch(`/account/${accountId}/deposit`, { amount })
  }
}

export default new ProfileService();