import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { assignUser } from "../../api/task.api";
import type { AssignUserT } from "../../lib/types";

export const useAssignUserToTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignUserT) => assignUser(data),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(String(error));
      }
    },
    onSuccess: async (data: any) => {
      toast.success("User successfully assigned");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", String(data.project.id)],
      });
    },
  });
};
