import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async updateUser(
    username: string,
    userUpdates: UpdateUserDto,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ username }, userUpdates);
  }
}
