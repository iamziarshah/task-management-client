import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, taskData }) => {
      const response = await client.put(ENDPOINTS.TASK_DETAIL(id), taskData);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.setQueryData(["tasks", data.id], data);
    },
  });
};
