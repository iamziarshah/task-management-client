import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";
import { setAuth } from "../../store/slices/authSlice";

export const useRegister = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await client.post(ENDPOINTS.AUTH_REGISTER, userData);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(
        setAuth({
          user: data.user,
          token: data.access_token,
        })
      );
    },
  });
};
