import { useQuery } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useTask = (id, options = {}) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await client.get(ENDPOINTS.TASK_DETAIL(id));
      return response.data.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
