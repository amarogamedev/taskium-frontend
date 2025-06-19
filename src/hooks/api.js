import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';
const baseURL = isLocalhost
    ? 'http://localhost:8080'
    : 'https://api.dominio.com'; //TODO alterar dps quando fizer o deploy

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
