import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAccessToken(username: string): Promise<string> {
    return this.jwtService.sign({ username }, { expiresIn: '1m' });
  }

  async createRefreshToken(username: string): Promise<string> {
    const tokenId = uuidv4();
    return this.jwtService.sign({ username, tokenId }, { expiresIn: '1d' });
  }

  async validateUser(payload: SignInDto): Promise<{ username: string }> {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (user?.password !== payload.password) {
      throw new UnauthorizedException('user or password not matching');
    }
    return { username: payload.username };
  }

  async decodeRefreshToken(oldRefreshToken: any) {
    try {
      return await this.jwtService.verifyAsync(oldRefreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
