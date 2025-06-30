import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `here we return ${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }
  //  @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body) {
  //   return body;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates ${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes ${id} coffee`;
  }
}
