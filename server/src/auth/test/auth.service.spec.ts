import { UsersService as mockUsersService } from '../../users/__mocks__/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;
  // let usersRepository: UsersRepository;
  // let userModel: Model<UserDocument>;

  const mockJwtService = {
    sign: jest.fn().mockImplementation((_payload) => {
      return 'mocked_token';
    }),
    verify: jest.fn().mockImplementation((_token) => {
      return { sub: 'username' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    })
      // .overrideProvider(JwtService)
      // .useValue(mockJwtService)
      // .overrideProvider(UsersModel)
      // .useValue(userModel)
      .compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
