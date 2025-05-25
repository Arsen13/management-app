import { IsIn, IsString } from 'class-validator';
import { TaskStatusT } from 'src/types/types';

export class ChangeStatusDto {
  @IsString()
  @IsIn(['todo', 'in_progress', 'done'])
  readonly status: TaskStatusT;
}
