import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { mockAuthService } from '../__mocks__/auth.service';
import { mockJwtService } from '../__mocks__/jwt.service';
import { mockUsersService } from '../../users/__mocks__/users.service';
import { SignInDto } from '../dto/sign-in.dto';
import { userStub } from '../../users/test/stubs/user.stub';

describe('AuthController', () => {
  let authController: AuthController;
  const user: SignInDto = userStub();

  const mockStatusResponse = {
    send: jest.fn((x) => x),
  };
  const mockResponse = {
    status: jest.fn(() => mockStatusResponse),
    send: jest.fn((x) => x),
    cookie: jest.fn(),
  };

  const mockRequest = {
    cookies: {
      refreshToken: 'mocked_refresh_token',
    },
  };

  const mockAttackRequest = {
    cookies: {
      refreshToken: 'mocked_compromised_refresh_token',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('when authController is initialized', () => {
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });
  });

  describe('@Post login', () => {
    describe('when login is called', () => {
      it('then it should log user', async () => {
        expect(
          // @ts-expect-error:TS2345
          await authController.login(mockResponse, user),
        ).toEqual({ access_token: 'mocked_token' });
        expect(mockResponse.send).toHaveBeenCalledWith({
          access_token: 'mocked_token',
        });
        expect(mockAuthService.validateUser).toHaveBeenCalledWith(user);
        expect(mockAuthService.createAccessToken).toHaveBeenCalledWith(
          user.username,
        );
        expect(mockAuthService.createRefreshToken).toHaveBeenCalledWith(
          user.username,
        );
        expect(mockAuthService.createRefreshToken('test_username')).toBe(
          'mocked_refresh_token',
        );
      });
      it.failing(
        'then it should fail to log user with bad password credentials',
        async () => {
          expect(
            // @ts-expect-error:TS2345
            await authController.login(mockResponse, {
              username: 'gala',
              password: '00001111',
            }),
          ).toEqual({ access_token: 'mocked_token' });
        },
      );
      it.failing(
        'then it should fail to log user with bad username credentials',
        async () => {
          expect(
            // @ts-expect-error:TS2345
            await authController.login(mockResponse, {
              username: 'takitoke',
              password: 'admin123',
            }),
          ).toEqual({ access_token: 'mocked_token' });
        },
      );
    });
  });

  describe('@Post refresh', () => {
    describe('when refresh is called', () => {
      it('should refresh the token of loged user', async () => {
        expect(
          // @ts-expect-error:TS2345
          await authController.refresh(mockResponse, mockRequest),
        ).toEqual({
          access_token: 'mocked_token',
        });
      });
      it.failing('should fail to refresh the token of loged user', async () => {
        expect(
          await authController.refresh(
            // @ts-expect-error:TS2345
            mockResponse,
            mockAttackRequest,
          ),
        ).toEqual({
          access_token: 'mocked_token',
        });
      });
    });
  });
});
