import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigResourcesService } from './config-resource.service';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';

@Controller('config')
export class ConfigResourceController {
  constructor(private readonly configResourceService: ConfigResourcesService) {}

  @Post()
  create(@Body() createConfigResourceDto: CreateConfigResourceDto) {
    return this.configResourceService.create(createConfigResourceDto);
  }

  @Get()
  findAll() {
    return this.configResourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const resource = await this.configResourceService.findOne(id);
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
  async remove(@Param('id') id: string) {
    try {
      return await this.configResourceService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
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
