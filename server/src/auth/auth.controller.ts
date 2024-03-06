import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res: Response, @Body() signInDto: SignInDto) {
    try {
      // Call validateUser and wait for it to complete
      await this.authService.validateUser(signInDto);

      // If validateUser completes successfully, proceed with the rest of the login logic
      const accessToken = await this.authService.createAccessToken(
        signInDto.username,
      );
      const refreshToken = await this.authService.createRefreshToken(
        signInDto.username,
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: true,
        // sameSite: 'strict',
      });
      return res.send({ access_token: accessToken });
    } catch (error) {
      // Handle the error, e.g., by sending an unauthorized response
      res.status(HttpStatus.UNAUTHORIZED).send({ message: error.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const oldRefreshToken = req.cookies['refreshToken'];

    const decodedToken =
      await this.authService.decodeRefreshToken(oldRefreshToken);
    const username = decodedToken.username;
    const newAccessToken = await this.authService.createAccessToken(username);
    const newRefreshToken = await this.authService.createRefreshToken(username);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
    });

    return res.send({ access_token: newAccessToken });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
    });

    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
