import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException(
        `User with email: '${createUserDto.email}' already exist`,
      );
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
