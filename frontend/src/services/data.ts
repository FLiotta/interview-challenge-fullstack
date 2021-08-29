// @Project
import ApiService from './api';

class DataService extends ApiService {
  getCurrencies() {
    return this.get('/data/currencies');
  }
}

export default new DataService();