import { Injectable } from '@nestjs/common';
import { Cat } from './schemas/cat.schema';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async createCat(
    catId: number,
    name: string,
    age: number,
    breed: string,
  ): Promise<Cat> {
    return this.catsRepository.create({
      catId,
      name,
      age,
      breed,
    });
  }

  async getCats(): Promise<Cat[]> {
    return this.catsRepository.find({});
  }

  async getCatById(catId: number): Promise<Cat> {
    return this.catsRepository.findOne({ catId });
  }
}
