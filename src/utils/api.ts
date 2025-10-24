import axios, { type AxiosInstance } from "axios";

export const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:500/api/v1",
});

// Simple helper to get & set tokens
const getToken = (key: string) => sessionStorage.getItem(key);

const setToken = (token: string, key: string) =>
  sessionStorage.setItem(key, token);

const removeToken = (key: string) => sessionStorage.removeItem(key);

API.interceptors.request.use(
  (config) => {
    const token = getToken("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

///
API.interceptors.response.use(
  (response) => {
    const access_token = response.headers["access-token"];
    const refresh_token = response.headers["x-access-token"];
    if (access_token) setToken(access_token, "access_token");
    if (refresh_token) setToken(refresh_token, "refresh_token");
    return response;
  },
  async (error) => {
    // <-- make async
    const reqConfig = error.config;

    if (!error.response) {
      console.error("Network error — please check your connection.");
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401 && !reqConfig._retry) {
      reqConfig._retry = true; // prevent infinite loops
      const refreshToken = getToken("refresh_token");

      if (!refreshToken) {
        console.warn("No refresh token found — redirecting to login.");
        removeToken("access_token");
        removeToken("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data, headers } = await axios.post(
          `${API.defaults.baseURL}/users/refresh-token`,
          { refreshToken: refreshToken }
        );

        const newAccessToken =
          headers["access-token"] || data.accessToken || null;

        if (newAccessToken) {
          setToken(newAccessToken, "access_token");
          reqConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(reqConfig);
        }
      } catch (refreshError) {
        console.error("Refresh token invalid — redirecting to login.");
        removeToken("access_token");
        removeToken("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other statuses
    switch (status) {
      case 403:
        console.warn("Forbidden — insufficient permissions.");
        break;
      case 404:
        console.warn("Resource not found.");
        break;
      case 500:
        console.error("Server error — please try again later.");
        break;
      default:
        console.error(error.response.data?.message || "An error occurred.");
    }

    return Promise.reject(error);
  }
);
