import Task from "./Task";

const data = {
  todo: [
    {
      id: 2,
      title: "first task",
      description: "first task desc",
      project: {
        id: 2,
      },
      user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      status: "todo",
      createdAt: "2025-05-28T07:07:24.450Z",
      updatedAt: "2025-05-28T07:07:24.450Z",
    },
    {
      id: 7,
      title: "some task",
      description: "some task desc",
      project: {
        id: 2,
      },
      user: null,
      status: "todo",
      createdAt: "2025-05-28T07:08:47.167Z",
      updatedAt: "2025-05-28T07:08:47.167Z",
    },
  ],
  in_progress: [
    {
      id: 3,
      title: "second task",
      description: "second task desc",
      project: {
        id: 2,
      },
      user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      status: "in_progress",
      createdAt: "2025-05-28T07:07:24.450Z",
      updatedAt: "2025-05-28T07:07:24.450Z",
    },
    {
      id: 4,
      title: "make this app work",
      description: "you need spend so many time for this task :(",
      project: {
        id: 2,
      },
      user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      status: "in_progress",
      createdAt: "2025-05-28T07:07:24.450Z",
      updatedAt: "2025-05-28T07:07:24.450Z",
    },
  ],
  done: [
    {
      id: 3,
      title: "second task",
      description: "second task desc",
      project: {
        id: 2,
      },
      user: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
      },
      status: "in_progress",
      createdAt: "2025-05-28T07:07:24.450Z",
      updatedAt: "2025-05-28T07:07:24.450Z",
    },
  ],
};

export default function Tasks() {
  return (
    <div className="flex flex-row flex-wrap gap-2.5 justify-around w-full">
      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          To Do
        </div>
        {data.todo.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          In Progress
        </div>
        {data.in_progress.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-[var(--widjet)] w-xs h-12 text-xl rounded-lg flex items-center justify-center">
          Done
        </div>
        {data.done.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
