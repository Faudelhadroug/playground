import { BadRequestException } from '@nestjs/common';
export const mockAuthService = {
  validateUser: jest.fn().mockImplementation((payload) => {
    if (payload?.password !== 'admin123' || payload.username !== 'gala')
      throw new BadRequestException('user or password not matching');
  }),
  createAccessToken: jest.fn().mockImplementation((_payload) => {
    return 'mocked_token';
  }),
  createRefreshToken: jest.fn().mockImplementation((_payload) => {
    return 'mocked_refresh_token';
  }),
  decodeRefreshToken: jest.fn().mockImplementation((refreshToken) => {
    if (refreshToken !== 'mocked_refresh_token')
      throw new BadRequestException('Invalid refresh token');
    return {
      username: 'gala',
    };
  }),
};
