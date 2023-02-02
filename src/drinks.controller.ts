import { CreateDrinkDto } from './create-drink.dto';
import { UpdateDrinkDto } from './update-drink.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('/drinks')
export class DrinksController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'name 1' }];
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return { id: id, name: 'name 1' };
  }

  @Post()
  create(@Body() input: CreateDrinkDto) {
    return input;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateDrinkDto) {}

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {}
}
