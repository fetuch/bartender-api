import { Length, IsString } from "class-validator";

export class CreateDrinkDto {
  @IsString()
  @Length(2, 255)
  name: string;

  @IsString()
  @Length(2, 255)
  glass: string;

  @IsString()
  @Length(2, 255)
  instructions: string;
}
