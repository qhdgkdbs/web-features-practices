import http from './http';

const config = {
    username: 'kminchelle',
    password: '0lelplR',
};

export const signIn = () => http.post('/auth/login', config);
