import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return this.configResourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigResourceDto: UpdateConfigResourceDto,
  ) {
    return this.configResourceService.update(id, updateConfigResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configResourceService.remove(id);
  }
}
