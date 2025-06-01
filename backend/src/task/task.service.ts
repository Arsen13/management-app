import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { groupedTaskT, TaskStatusT } from 'src/types/types';
import { ChangeStatusDto } from './dto/change-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, projectId: number) {
    const isTaskExist = await this.taskRepository.findBy({
      title: createTaskDto.title,
      project: { id: projectId },
    });

    if (isTaskExist.length) {
      throw new BadRequestException(
        `Task with title: '${createTaskDto.title}' already exist`,
      );
    }

    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: 'todo' as TaskStatusT,
      user: undefined,
      project: {
        id: projectId,
      },
    };

    return await this.taskRepository.save(newTask);
  }

  async findAll(projectId: number) {
    const result = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName'])
      .leftJoin('task.project', 'project')
      .addSelect(['project.id'])
      .where('project.id = :projectId', { projectId })
      .getMany();

    const groupedTasks: groupedTaskT = {
      todo: [],
      in_progress: [],
      done: [],
    };

    result.forEach((task) => {
      if (task.status == 'todo') groupedTasks.todo.push(task);
      if (task.status == 'in_progress') groupedTasks.in_progress.push(task);
      if (task.status == 'done') groupedTasks.done.push(task);
    });

    return groupedTasks;
  }

  async assignUser(taskId: number, userId: number, assignedUserId: number) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoin('project.user', 'user')
      .addSelect(['user.id'])
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.project.user.id !== userId) {
      throw new BadRequestException("You aren't the project owner");
    }

    return await this.taskRepository.save(
      Object.assign(task, { user: { id: assignedUserId } }),
    );
  }

  async changeStatus(
    taskId: number,
    userId: number,
    changeStatusDto: ChangeStatusDto,
  ) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.project', 'project')
      .addSelect(['project.id'])
      .leftJoin('task.user', 'user')
      .addSelect(['user.id'])
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepository.save(Object.assign(task, changeStatusDto));
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return await this.taskRepository.save(Object.assign(task, updateTaskDto));
  }

  async delete(taskId: number) {
    const result = await this.taskRepository
      .createQueryBuilder('task')
      .delete()
      .where('id = :taskId', { taskId })
      .execute();

    if (result.affected == 0) {
      throw new NotFoundException('Task not found');
    }

    return {
      message: 'Task was deleted successfully',
      affected: result.affected,
    };
  }
}
