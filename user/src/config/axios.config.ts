import axios from "axios";
import { error } from "console";

const BaseAxios = axios.create({
  baseURL: "http://localhost:8000/",
});

BaseAxios.interceptors.request.use(
  async (config) => {
    let token;
    token = localStorage.getItem("token");
    if (token !== null) config.headers.Authorization = `Beare${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
