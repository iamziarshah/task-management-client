import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../../api/client";
import { ENDPOINTS } from "../../api/config";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await client.delete(ENDPOINTS.TASK_DETAIL(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
    },
  });
};
