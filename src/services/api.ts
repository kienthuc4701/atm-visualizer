import { deleteCookie, getCookie, setCookie } from '@/lib/utils';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];



// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie(`${import.meta.env.VITE_ATM_TOKEN}`);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   if (isRefreshing) {
    //     return new Promise((resolve) => {
    //       subscribeTokenRefresh((token: string) => {
    //         originalRequest.headers['Authorization'] = 'Bearer ' + token;
    //         resolve(api(originalRequest));
    //       });
    //     });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   try {
    //     const newToken = await refreshAuthToken();
    //     originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
    //     onTokenRefreshed(newToken);
    //     return api(originalRequest);
    //   } catch (refreshError) {
    //     // Handle refresh token error (e.g., redirect to login)
    //     return Promise.reject(refreshError);
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }
    return Promise.reject(error);
  }
);

export const login = async (cardNumber: string, pin: number) => {
  const response = await api.post('/login', { cardNumber, pin });
  // setAuthToken(response.data.token);
  return response.data;
};

export const logout = async () => {
  await api.post('/logout');
  deleteCookie(`${import.meta.env.VITE_ATM_TOKEN}`, '/', `.${import.meta.env.VITE_BASE_FRONTEND_URL}`);
};

export const getBalance = async (type:string) => {
  const response = await api.get(`/auth/${type}`);
  return response.data;
};

export const withdraw = async (amount: number) => {
  const response = await api.post('/withdraw', { amount });
  return response.data;
};

export const deposit = async (amount: number) => {
  const response = await api.post('/deposit', { amount });
  return response.data;
};

export const getBillPrint = async () => {
  const response = await api.get('/bill-print');
  return response.data;
};

export default api;