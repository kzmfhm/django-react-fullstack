// import axios from "axios";
// import { ACCESS_TOKEN } from "./constants";

// const apiURL = "/choreo-apis/djangoreactauth/backend/v1";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(ACCESS_TOKEN);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL = "/choreo-apis/djangoreactauth/backend/v1";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login/", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export default api;
