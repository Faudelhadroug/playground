import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { mockJwtService } from '../__mocks__/jwt.service';
import { mockUsersService } from '../../users/__mocks__/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  describe('when authServ is initialized', () => {
    it('then it should be defined', () => {
      expect(authService).toBeDefined();
    });
  });

  describe('validateUser', () => {
    describe('when validateUser is called', () => {
      it('then it should verify user then return the username of payload', async () => {
        expect(
          await authService.validateUser({
            username: 'gala',
            password: 'admin123',
          }),
        ).toEqual({ username: 'gala' });
      });
      it('then it should throw an BadRequestException', async () => {
        await expect(
          authService.validateUser({
            username: 'gala',
            password: 'adminabc',
          }),
        ).rejects.toThrow(BadRequestException);
      });
    });
  });

  describe('sign JWT (createAccessToken & createRefreshToken)', () => {
    describe('when createAccessToken is called', () => {
      it('then it should return a signed string', async () => {
        expect(await authService.createAccessToken('username')).toBe(
          'mocked_token',
        );
      });
    });
    describe('when createRefreshToken is called', () => {
      it('then it should return a signed string', async () => {
        expect(await authService.createRefreshToken('username')).toBe(
          'mocked_token',
        );
      });
    });
  });

  describe('decodeRefreshToken', () => {
    describe('when decodeRefreshToken is called', () => {
      it('then it should return a decoded string', async () => {
        expect(await authService.decodeRefreshToken('oldRefreshToken')).toEqual(
          { username: 'gala' },
        );
      });
    });
  });
});
