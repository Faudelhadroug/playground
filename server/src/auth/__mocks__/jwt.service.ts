export const mockJwtService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sign: jest.fn().mockImplementation((_payload) => {
    return 'mocked_token';
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyAsync: jest.fn().mockImplementation(async (_token) => {
    return { username: 'gala' };
  }),
};
