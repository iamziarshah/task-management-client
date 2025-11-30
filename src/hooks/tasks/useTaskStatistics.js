import { useQuery } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useTaskStatistics = (options = {}) => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await client.get(ENDPOINTS.TASKS_STATISTICS);
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
