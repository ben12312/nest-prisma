import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  slug: string;

  parent: string;
}