import { useQuery } from "@tanstack/react-query";
import ProjectItem from "./ProjectItem";
import { getProjects } from "../../api/project.api";
import type { ProjectT } from "../../lib/types";

export default function ProjectList() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="flex flex-wrap gap-5 items-center justify-center">
      {data &&
        data.map((project: ProjectT) => (
          <ProjectItem key={project.id} project={project} />
        ))}
    </div>
  );
}
