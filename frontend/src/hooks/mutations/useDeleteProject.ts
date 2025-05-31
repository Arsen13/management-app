import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../api/project.api";
import toast from "react-hot-toast";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onError: (error) => toast.error(String(error)),
    onSuccess: async (data) => {
      toast.success(String(data.message));
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
