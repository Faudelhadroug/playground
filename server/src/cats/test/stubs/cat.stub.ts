import { Cat } from '../../schemas/cat.schema';

export const catStub = (): Cat => {
  return {
    catId: 1,
    name: 'Gala',
    age: 3,
    breed: 'Birman',
  };
};
