import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { DeleteTaskT } from "../../lib/types";
import { deleteTask } from "../../api/task.api";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteTaskT) => deleteTask(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        console.error(error);
      }
    },
    onSuccess: async (data) => {
      toast.success("Task was successfully deleted");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", String(data.projectId)],
      });
    },
  });
};
