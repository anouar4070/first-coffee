import {
  Body,
  Controller,
  Delete,
  Get,
  //Inject,
  Param,
  Patch,
  Post,
  Query,
  //SetMetadata,
  //UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';
//import { REQUEST } from '@nestjs/core';

//@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    //@Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('CoffeesController created');
  }

  //@UsePipes(ValidationPipe)
  //@ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(
    //@Protocol() protocol: string,
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    //const { limit, offset } = paginationQuery;
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(protocol);
    return this.coffeesService.findAll(paginationQuery);
    //return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    //http://localhost:3000/coffees?limit=20&offset=10
  }
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //console.log(typeof id);
    console.log(id);
    return this.coffeesService.findOne('' + id);
    //return `here we return ${id} coffee`;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); //true //due to "transform: true" within main.ts
    return this.coffeesService.create(createCoffeeDto);
  }
  //  @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body) {
  //   return body;
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto);
    //return `This action updates ${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
    //return `This action removes ${id} coffee`;
  }
}
