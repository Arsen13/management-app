import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import { getTasks } from "../../api/task.api";
import { useParams } from "react-router-dom";
import type { TaskT } from "../../lib/types";

export default function Tasks() {
  const { projectId: id } = useParams();

  const { data, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTasks(id as string),
  });

  if (isError || !data) return <p>Something went wrong</p>;

  return (
    <div className="flex flex-row flex-wrap gap-2.5 justify-around w-full">
      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          To Do
        </div>
        {data.todo.map((task: TaskT) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          In Progress
        </div>
        {data.in_progress.map((task: TaskT) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          Done
        </div>
        {data.done.map((task: TaskT) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
