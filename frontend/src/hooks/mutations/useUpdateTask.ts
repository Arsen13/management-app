import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTask } from "../../api/task.api";
import type { UpdateTaskT } from "../../lib/types";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskT) => updateTask(data),
    onError: () => toast.error("Error with updating task"),
    onSuccess: async (data: any) => {
      toast.success("Task was updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", String(data.project.id)],
      });
    },
  });
};
