import store from "../store";
import { setToken, logout } from "../store/slices/authSlice";

export const setupInterceptors = (client) => {
  client.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token;

      // Only add token if it exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const state = store.getState();
      const token = state.auth.token;

      if (originalRequest.url.includes("/auth/refresh")) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      // Only retry if we HAVE a token
      if (error.response?.status === 401 && token && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await client.post("/auth/refresh");
          const { access_token } = response.data;
          store.dispatch(setToken(access_token));
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return client(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      // If 401 but NO token, just reject (user not logged in)
      if (error.response?.status === 401 && !token) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
