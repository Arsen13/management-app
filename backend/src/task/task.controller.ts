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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('task')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Used to create a new task' })
  @ApiCreatedResponse({ description: 'Task created' })
  @Post(':projectId')
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('projectId') projectId: string,
  ) {
    return this.taskService.create(createTaskDto, +projectId);
  }

  @ApiOperation({ summary: 'Used to get a list of tasks' })
  @ApiCreatedResponse({ description: 'Tasks found' })
  @Get(':projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.taskService.findAll(+projectId);
  }

  @ApiOperation({ summary: 'Used to assign a user to task' })
  @ApiCreatedResponse({ description: 'User assigned to task' })
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

  @ApiOperation({ summary: 'Used to change a status of task' })
  @ApiCreatedResponse({ description: 'Status changed' })
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

  @ApiOperation({ summary: 'Used to update information about a task' })
  @ApiCreatedResponse({ description: 'Task updated' })
  @Patch(':taskId')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.update(+taskId, updateTaskDto);
  }

  @ApiOperation({ summary: 'Used to delete a task' })
  @ApiCreatedResponse({ description: 'Task deleted' })
  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    return this.taskService.delete(+taskId);
  }
}
