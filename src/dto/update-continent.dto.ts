import { PartialType } from '@nestjs/mapped-types';
import { ContinentDto } from './continent.dto';

export class UpdateContinentDto extends PartialType(ContinentDto) {}
