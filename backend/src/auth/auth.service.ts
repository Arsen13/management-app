import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException(`User with email: '${email}' not found`);
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      throw new BadRequestException('Password is incorrect');
    }

    const { password: userPass, ...result } = user;

    return result;
  }

  async login(user: IUser) {
    const { id, email, firstName, lastName } = user;

    const token = this.jwtService.sign({ id, email, firstName, lastName });

    return { id, email, firstName, lastName, token };
  }
}
