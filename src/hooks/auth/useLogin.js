import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";
import { setAuth } from "../../store/slices/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await client.post(ENDPOINTS.AUTH_LOGIN, credentials);
      return response.data;
    },
    onSuccess: (response) => {
      const { access_token } = response.data;

      dispatch(
        setAuth({
          user: null,
          token: access_token,
        })
      );

      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
