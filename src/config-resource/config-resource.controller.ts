import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigResourceService } from './config-resource.service';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';

@Controller('config')
export class ConfigResourceController {
  constructor(private readonly configResourceService: ConfigResourceService) {}

  @Post()
  create(@Body() createConfigResourceDto: CreateConfigResourceDto) {
    return this.configResourceService.create(createConfigResourceDto);
  }

  @Get()
  findAll() {
    return this.configResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const resource = this.configResourceService.findOne(id);
    if (!resource) {
      throw new NotFoundException(`Resource with id ${id} not found`);
    }
    return resource;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigResourceDto: UpdateConfigResourceDto,
  ) {
    try {
      return this.configResourceService.update(id, updateConfigResourceDto);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('id not found')) {
          throw new NotFoundException(
            `Could not update: resource with id ${id} not found`,
          );
        } else {
          throw new BadRequestException(
            'Could not update: check your payload value',
          );
        }
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.configResourceService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('id not found')) {
          throw new NotFoundException(
            `Could not delete: resource with id ${id} not found`,
          );
        } else {
          throw new BadRequestException(
            'Could not delete: check your payload value',
          );
        }
      }
    }
  }
}
