import type { TaskT } from "../../lib/types";
import AssignUser from "./AssignUser";
import TaskButtons from "./TaskButtons";

export default function Task({ task }: { task: TaskT }) {
  return (
    <div className="flex flex-col gap-1 pb-1.5 relative bg-[var(--widjet)] w-xs h-38 pl-3 rounded-lg">
      <p className="text-xl">{task.title}</p>
      <p className="h-2/5 italic text-[var(--text-gray)]">{task.description}</p>
      {task.user ? (
        <p>Assigned user: {`${task.user.firstName} ${task.user.lastName}`}</p>
      ) : (
        <AssignUser />
      )}
      <p className="text-sm italic text-[var(--text-gray)]">
        {task.createdAt.split("T")[0].split("-").reverse().join("/")}
      </p>
      <TaskButtons />
    </div>
  );
}
