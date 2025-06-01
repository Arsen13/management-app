import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeStatus } from "../../api/task.api";
import type { ChangeStatusT } from "../../lib/types";
import { AxiosError } from "axios";

export const useChangeTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeStatusT) => changeStatus(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error with change task status");
      }
    },
    onSuccess: async (data: any) => {
      toast.success("Task status was successfully updated");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", String(data.project.id)],
      });
    },
  });
};
