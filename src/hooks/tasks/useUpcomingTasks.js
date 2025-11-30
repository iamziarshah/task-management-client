import { useQuery } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useUpcomingTasks = (options = {}) => {
  return useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const response = await client.get(ENDPOINTS.TASKS_UPCOMING);
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};
