import { Length, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @Length(2, 255)
  name: string;
}
