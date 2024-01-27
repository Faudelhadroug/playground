import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { Cat } from './schemas/cat.schema';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':catId')
  async getCat(@Param('catId') catId: number): Promise<Cat> {
    return this.catsService.getCatById(catId);
  }

  @Get()
  async getCats(): Promise<Cat[]> {
    return this.catsService.getCats();
  }

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> | never {
    function hasCorrectArgument(arg) {
      return (
        arg.hasOwnProperty('catId') &&
        arg.hasOwnProperty('name') &&
        arg.hasOwnProperty('age') &&
        arg.hasOwnProperty('breed')
      );
    }
    if (!hasCorrectArgument(createCatDto))
      throw new HttpException('Bad argument!', HttpStatus.BAD_REQUEST);
    return this.catsService.createCat(
      createCatDto.catId,
      createCatDto.name,
      createCatDto.age,
      createCatDto.breed,
    );
  }
}
