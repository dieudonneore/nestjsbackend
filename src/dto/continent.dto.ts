import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContinentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly Code: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly Name: string;
  readonly translation: [];
}
