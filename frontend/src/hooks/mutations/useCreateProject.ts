import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CreateProjectT } from "../../lib/types";
import { createProject } from "../../api/project.api";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectT) => createProject(data),
    onError: (error) => toast.error(String(error)),
    onSuccess: async () => {
      toast.success("Project was successfully created");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
