import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import settings from '@/settings';

const baseURL = settings.PAYSTACK.BASE_URL;

export const config: AxiosRequestConfig = {
    baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + settings.PAYSTACK.SECRET_KEY,
    },
};

const http: AxiosInstance = axios.create(config);

export default http;
