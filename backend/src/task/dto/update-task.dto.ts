import { PickType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PickType(CreateTaskDto, [
  'title',
  'description',
]) {}
