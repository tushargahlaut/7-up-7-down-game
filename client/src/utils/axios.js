import axios from "axios";

const backendUrl = "http://localhost:8080";

export const BaseAxios = axios.create({
  baseURL: backendUrl,
});

//For Already Logged In User
export const ExtAxios = axios.create({
  baseURL: BaseAxios.defaults.baseURL,
});

ExtAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ExtAxios;
