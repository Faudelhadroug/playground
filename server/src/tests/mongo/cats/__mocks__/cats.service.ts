import { catStub } from '../test/stubs/cat.stub';

export const CatsService = jest.fn().mockReturnValue({
  getCats: jest.fn().mockResolvedValue([catStub()]),
  getCatById: jest.fn().mockResolvedValue(catStub()),
  createCat: jest.fn().mockResolvedValue(catStub()),
});
