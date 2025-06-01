import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
