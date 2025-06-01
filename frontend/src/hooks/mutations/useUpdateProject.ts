import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProject } from "../../api/project.api";
import type { UpdateProjectT } from "../../lib/types";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectT) => updateProject(data),
    onError: (error) => toast.error(String(error)),
    onSuccess: async () => {
      toast.success("Project was updated successfully"),
        await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
