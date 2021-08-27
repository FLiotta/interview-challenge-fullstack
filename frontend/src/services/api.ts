// @Packages
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// @Project
import config from 'config';

class ApiService {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: config.servicePath
    });
  }

  get(path: string, params?: AxiosRequestConfig) {
    return this.http.get(path, params);
  }

  post(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.http.post(path, data, config);
  }

  // @ping
  ping() {
    return this.http.get('/ping');
  }
}

export default ApiService;