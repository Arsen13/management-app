import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import type { ProjectT } from "../../lib/types";
import { useDeleteProject } from "../../hooks/mutations/useDeleteProject";

export default function ProjectItem({ project }: { project: ProjectT }) {
  const deleteMutation = useDeleteProject();

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you wanna delete '${project.title}' project?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-md h-50 flex flex-col bg-[var(--widjet)] gap-2.5 rounded-2xl">
      <h2 className="text-center text-3xl mt-1">{project.title}</h2>
      <p className="h-2/4 mx-4 italic text-[var(--text-gray)]">
        {project.title}
      </p>
      <div className="flex justify-between mr-4">
        <p className="ml-4 italic text-[var(--text-gray)]">
          {project.createdAt.split("T")[0].split("-").reverse().join("/")}
        </p>
        <Link to={`/project/${project.id}`} className="hover:underline">
          Details
        </Link>
        <div className="flex gap-2">
          <RxUpdate className="w-5 h-5 cursor-pointer duration-300 hover:text-yellow-600" />
          <MdDelete
            onClick={() => handleDelete(project.id)}
            className="w-5 h-5 cursor-pointer duration-300 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
}
