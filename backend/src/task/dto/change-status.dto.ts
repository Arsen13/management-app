import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { TaskStatusT } from 'src/types/types';

export class ChangeStatusDto {
  @ApiProperty()
  @IsString()
  @IsIn(['todo', 'in_progress', 'done'])
  readonly status: TaskStatusT;
}
