import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all coffees';
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
}
