import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Used to create a new user' })
  @ApiCreatedResponse({ description: 'User created' })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Used to get a list of users' })
  @ApiCreatedResponse({ description: 'Users found' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.userService.findAll(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to update information about a user' })
  @ApiCreatedResponse({ description: 'User updated' })
  @Put()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.userService.update(updateUserDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Used to delete a user' })
  @ApiCreatedResponse({ description: 'User deleted' })
  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Req() req) {
    return this.userService.delete(+req.user.id);
  }
}
