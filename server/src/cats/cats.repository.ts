import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(cat: Cat): Promise<Cat> {
    const newCat = new this.catModel(cat);
    return newCat.save();
  }
  async find(catsFilterQuery: FilterQuery<Cat>): Promise<Cat[]> {
    return this.catModel.find(catsFilterQuery);
  }
  async findOne(catFilterQuery: FilterQuery<Cat>): Promise<Cat> {
    return this.catModel.findOne(catFilterQuery);
  }
}
