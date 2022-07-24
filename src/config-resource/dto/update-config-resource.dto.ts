import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigResourceDto } from './create-config-resource.dto';

export class UpdateConfigResourceDto extends PartialType(
  CreateConfigResourceDto,
) {}
