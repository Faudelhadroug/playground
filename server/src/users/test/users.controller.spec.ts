import { CreateUserDto } from './../dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().username);
      });

      test('then it should call usersSerivce', () => {
        expect(usersService.getUserByUsername).toHaveBeenCalledWith(
          userStub().username,
        );
      });

      test('then it should return a User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      test('then it should return all Users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          username: userStub().username,
          password: userStub().password,
        };
        user = await usersController.createUser(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return created new User saved', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          username: 'mala',
          password: 'admin123',
        };
        user = await usersController.updateUser(
          userStub().username,
          updateUserDto,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userStub().username,
          updateUserDto,
        );
      });

      test('then it should update User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
