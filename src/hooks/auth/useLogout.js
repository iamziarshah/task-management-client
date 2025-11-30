import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";
import { logout } from "../../store/slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      await client.post(ENDPOINTS.AUTH_LOGOUT);
    },
    onSuccess: () => {
      dispatch(logout());
    },
  });
};
