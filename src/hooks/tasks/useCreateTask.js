import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData) => {
      const response = await client.post(ENDPOINTS.TASKS, taskData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming"] });
    },
  });
};
