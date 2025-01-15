import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const login = (email, password) => {
    return axios.post(`${apiUrl}/login`, { email, password });
};

const register = (fullname, email, password) => {
    return axios.post(`${apiUrl}/register`, { fullname, email, password });
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export default {
    login,
    register,
    logout
};
