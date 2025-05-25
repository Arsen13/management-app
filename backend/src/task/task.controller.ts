import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { AssignUserDto } from './dto/assign-user.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':projectId')
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('projectId') projectId: string,
  ) {
    return this.taskService.create(createTaskDto, +projectId);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Patch('assign/:taskId')
  @UsePipes(new ValidationPipe())
  assignUser(
    @Body() assignUserDto: AssignUserDto,
    @Param('taskId') taskId: string,
    @Req() req,
  ) {
    return this.taskService.assignUser(
      +taskId,
      +req.user.id,
      +assignUserDto.id,
    );
  }

  @Patch('status/:taskId')
  @UsePipes(new ValidationPipe())
  changeStatus(
    @Body() changeStatusDto: ChangeStatusDto,
    @Param('taskId') taskId: string,
    @Req() req,
  ) {
    return this.taskService.changeStatus(
      +taskId,
      +req.user.id,
      changeStatusDto,
    );
  }

  @Patch(':taskId')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.update(+taskId, updateTaskDto);
  }

  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    return this.taskService.delete(+taskId);
  }
}
