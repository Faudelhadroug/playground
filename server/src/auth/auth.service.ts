import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: SignInDto): Promise<{ username: string }> {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (user?.password !== payload.password) {
      throw new BadRequestException('user or password not matching');
    }
    return { username: payload.username };
  }

  async createAccessToken(username: string): Promise<string> {
    return this.jwtService.sign({ username }, { expiresIn: '1m' });
  }

  async createRefreshToken(username: string): Promise<string> {
    const tokenId = uuidv4();
    return this.jwtService.sign({ username, tokenId }, { expiresIn: '1d' });
  }

  async decodeRefreshToken(oldRefreshToken: string) {
    try {
      return await this.jwtService.verifyAsync(oldRefreshToken);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
