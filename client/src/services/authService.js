import axios from "axios";

const apiUrl = "https://cordelia-8sms.onrender.com";

const login = (email, password) => {
  return axios.post(`${apiUrl}/login`, { username: email, password });
};

const register = (fullname, email, password, userType) => {
  return axios.post(`${apiUrl}/register`, {
    username: email,
    password,
    userType: userType,
  });
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export default {
  login,
  register,
  logout,
};
