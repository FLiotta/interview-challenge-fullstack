// @Packages
import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig } from 'axios';
import Cookie from 'universal-cookie';

// @Project
import config from 'config';

// @Initialization
const cookie = new Cookie();

const beforeRequestInterception = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = cookie.get('token');
  
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

class ApiService {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: config.servicePath,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.http.interceptors.request.use(beforeRequestInterception)
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