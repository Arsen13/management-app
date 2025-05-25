import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
