import { useQuery } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useTasks = (options = {}) => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await client.get(ENDPOINTS.TASKS);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    ...options,
  });
};
