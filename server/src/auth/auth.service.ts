import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { compare } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: SignInDto): Promise<{ username: string }> {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (!user) {
      throw new BadRequestException('bad credentials');
    }
    try {
      if (!(await compare(payload.password, user.password)))
        throw new BadRequestException('bad credentials');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return { username: payload.username };
  }

  async createAccessToken(username: string): Promise<string> {
    return this.jwtService.sign({ username }, { expiresIn: '15m' });
  }

  async createRefreshToken(username: string): Promise<string> {
    const tokenId = uuidv4();
    return this.jwtService.sign({ username, tokenId }, { expiresIn: '6h' });
  }

  async decodeRefreshToken(oldRefreshToken: string) {
    try {
      return await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.JWT,
      });
    } catch (error) {
      throw new BadRequestException(
        'Your token is invalid or expired. Please log in again.',
      );
    }
  }
}
