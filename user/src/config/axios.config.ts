import axios from "axios";
const BaseAxios = axios.create({
  baseURL: "http://localhost:8000",
});
axios.defaults.withCredentials = true;
BaseAxios.defaults.withCredentials = true;
BaseAxios.interceptors.request.use(
  async (config) => {
    let token;
    try {
      token = localStorage.getItem("token");
    } catch (error) {
      throw error;
    }
    if (token !== null) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: Error) => {
    Promise.reject(error);
  }
);
BaseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default BaseAxios;
