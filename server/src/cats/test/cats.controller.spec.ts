import { CreateCatDto } from '../dto/create-cat.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { catStub } from './stubs/cat.stub';
import { Cat } from '../schemas/cat.schema';

jest.mock('../cats.service');

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
    jest.clearAllMocks();
  });

  describe('getCat', () => {
    describe('when getCat is called', () => {
      let cat: Cat;

      beforeEach(async () => {
        cat = await catsController.getCat(catStub().catId);
      });

      test('then it should call catsSerivce', () => {
        expect(catsService.getCatById).toHaveBeenCalledWith(catStub().catId);
      });

      test('then it should return a Cat', () => {
        expect(cat).toEqual(catStub());
      });
    });
  });

  describe('getCats', () => {
    describe('when getCats is called', () => {
      let cats: Cat[];

      beforeEach(async () => {
        cats = await catsController.getCats();
      });

      test('then it should call catsService', () => {
        expect(catsService.getCats).toHaveBeenCalled();
      });

      test('then it should return all Cats', () => {
        expect(cats).toEqual([catStub()]);
      });
    });
  });

  describe('createCat', () => {
    describe('when createCat is called', () => {
      let cat: Cat;
      let createCatDto: CreateCatDto;

      beforeEach(async () => {
        createCatDto = {
          catId: catStub().catId,
          name: catStub().name,
          age: catStub().age,
          breed: catStub().breed,
        };
        cat = await catsController.createCat(createCatDto);
      });

      test('then it should call catsService', () => {
        expect(catsService.createCat).toHaveBeenCalledWith(
          createCatDto.catId,
          createCatDto.name,
          createCatDto.age,
          createCatDto.breed,
        );
      });

      test('then it should return created new Cat saved', () => {
        expect(cat).toEqual(catStub());
      });
    });
  });
});
