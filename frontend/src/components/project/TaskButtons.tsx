import { MdNavigateNext, MdOutlineDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import type { TaskButtonsProps } from "../../lib/types";
import { useChangeTaskStatus } from "../../hooks/mutations/useChangeTaskStatus";
import { useDeleteTask } from "../../hooks/mutations/useDeleteTask";

export default function TaskButtons({
  setIsModalOpen,
  task,
}: TaskButtonsProps) {
  const changeStatusMutation = useChangeTaskStatus();

  const deleteTaskMutation = useDeleteTask();

  const handleDelete = (taskId: number, projectId: number) => {
    if (confirm(`Are you sure you wanna delete '${task.title}' task?`)) {
      deleteTaskMutation.mutate({ taskId, projectId });
    }
  };

  return (
    <>
      <div className="absolute flex top-2 right-3 items-center gap-1">
        {task.status != "done" && (
          <MdNavigateNext
            onClick={() =>
              changeStatusMutation.mutate({
                taskId: task.id,
                currentStatus: task.status,
              })
            }
            title="Change status"
            className="w-6 h-6 cursor-pointer duration-300 hover:text-sky-500"
          />
        )}
        <RxUpdate
          onClick={() => setIsModalOpen(true)}
          title="Update this task"
          className="w-4 h-4 cursor-pointer duration-300 hover:text-orange-600"
        />
        <MdOutlineDeleteOutline
          onClick={() => handleDelete(task.id, task.project.id)}
          title="Delete this task"
          className="w-5 h-5 cursor-pointer duration-300 hover:text-red-600"
        />
      </div>
    </>
  );
}
