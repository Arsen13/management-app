import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/task.api";
import type { CreateTaskT } from "../../lib/types";
import toast from "react-hot-toast";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskT) => createTask(data),
    onError: () => toast.error("Some error occured"),
    onSuccess: async (data) => {
      toast.success("Task was created successfully");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", String(data.project.id)],
      });
    },
  });
};
