import { IsString, IsNotEmpty } from 'class-validator';

export class CreateConfigResourceDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly value: string;
}
