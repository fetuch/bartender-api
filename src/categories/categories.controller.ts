import { Repository } from "typeorm/repository/Repository";
import { CreateCategoryDto } from "./create-category.dto";
import { Category } from "./category.entity";
import { UpdateCategoryDto } from "./update-category.dto";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  SerializeOptions,
  UseInterceptors,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist";

@Controller("/categories")
@SerializeOptions({ strategy: "excludeAll" })
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    this.logger.log("Hit the find all categories route");
    const categories = await this.repository.find();
    this.logger.debug(`Found ${categories.length} categories.`);
    return categories;
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param("id") id: number) {
    const category = await this.repository.findOneBy({ id: id });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateCategoryDto) {
    return await this.repository.save({
      ...input,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  @Patch(":id")
  @UseInterceptors(ClassSerializerInterceptor)
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
