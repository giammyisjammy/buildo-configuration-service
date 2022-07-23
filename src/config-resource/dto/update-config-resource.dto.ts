import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateConfigResourceDto } from './create-config-resource.dto';

export class UpdateConfigResourceDto extends PartialType(
  OmitType(CreateConfigResourceDto, ['id'] as const),
) {}
