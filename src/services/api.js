import axios from 'axios';

const api = axios.create({
    baseURL: 'https://private-9d65b3-tinnova.apiary-mock.com',
})

export default api;