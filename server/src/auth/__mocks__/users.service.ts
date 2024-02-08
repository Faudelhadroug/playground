export const mockUsersService = {
  getUserByUsername: jest.fn().mockResolvedValue({
    username: 'gala',
    password: 'admin123',
  }),
};
