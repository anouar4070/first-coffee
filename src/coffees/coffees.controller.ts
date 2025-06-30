import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll() {
    return 'here we return all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `here we return ${id} coffee`;
  }
}
