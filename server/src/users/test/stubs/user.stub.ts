import { User } from 'src/users/schemas/user.schema';

export const userStub = (): User => {
  return {
    username: 'gala',
    password: 'admin123',
  };
};
