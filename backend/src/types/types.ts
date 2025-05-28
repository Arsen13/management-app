import { Task } from 'src/task/entities/task.entity';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type TaskStatusT = 'todo' | 'in_progress' | 'done';

export type groupedTaskT = {
  todo: Task[];
  in_progress: Task[];
  done: Task[];
};
