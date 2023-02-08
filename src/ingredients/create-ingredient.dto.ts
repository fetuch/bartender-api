import { Length, IsString } from "class-validator";

export class CreateIngredientDto {
  @IsString()
  @Length(2, 255)
  name: string;
}
