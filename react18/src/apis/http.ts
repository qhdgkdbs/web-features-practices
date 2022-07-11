import axios from 'axios';

const http = axios.create({
    headers: { Accept: 'application/json' },
    baseURL: 'https://dummyjson.com',
});

export default http;
