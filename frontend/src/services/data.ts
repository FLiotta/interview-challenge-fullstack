// @Project
import ApiService from './api';

export interface UpdateCreateCurrencyPayload {
  name?: string,
  symbol?: string
}

class DataService extends ApiService {
  getCurrencies() {
    return this.get('/data/currencies');
  }

  getCurrency(currencyId: number) {
    return this.get(`/data/currencies/${currencyId}`)
  }

  updateCurrency(currencyId: number, payload: UpdateCreateCurrencyPayload) {
    return this.patch(`/data/currencies/${currencyId}`, payload);
  }

  createCurrency(payload: UpdateCreateCurrencyPayload){
    return this.post('/data/currencies', payload);
  }
}

export default new DataService();