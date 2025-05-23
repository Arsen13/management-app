import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @IsString()
  @MinLength(3)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password: string;

  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}
