import { Repository } from "typeorm/repository/Repository";
import { CreateCategoryDto } from "./create-category.dto";
import { Category } from "./category.entity";
import { UpdateCategoryDto } from "./update-category.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";

@Controller("/categories")
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  @Get()
  async findAll() {
    this.logger.log("Hit the find all categories route");
    const categories = await this.repository.find();
    this.logger.debug(`Found ${categories.length} categories.`);
    return categories;
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const category = await this.repository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  @Post()
  async create(@Body() input: CreateCategoryDto) {
    return await this.repository.save({
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  @Patch(":id")
  async update(@Param("id") id, @Body() input: UpdateCategoryDto) {
    const category = await this.repository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...category,
      ...input,
      updated_at: new Date(),
    });
  }

  @Delete(":id")
  @HttpCode(204)
  async remove(@Param("id") id: number) {
    const category = await this.repository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException();
    }

    await this.repository.remove(category);
  }
}
