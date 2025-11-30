import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : null,
  token: localStorage.getItem("authToken") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (action.payload.token) {
        localStorage.setItem("authToken", action.payload.token);
      }
      if (action.payload.user) {
        localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      }

      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, logout, setToken, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
