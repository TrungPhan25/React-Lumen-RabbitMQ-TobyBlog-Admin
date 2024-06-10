import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.code == 'ERR_NETWORK') {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.reload();
      return Promise.reject(error);
    }
    
    if (error.response && error.response.status == 401) {
      console.log("Error 401");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
