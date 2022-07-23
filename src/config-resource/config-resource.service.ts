import { Injectable } from '@nestjs/common';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';

@Injectable()
export class ConfigResourceService {
  create(createConfigResourceDto: CreateConfigResourceDto) {
    return 'This action adds a new configResource';
  }

  findAll() {
    return `This action returns all configResource`;
  }

  findOne(id: string) {
    return `This action returns a #${id} configResource`;
  }

  update(id: string, updateConfigResourceDto: UpdateConfigResourceDto) {
    return `This action updates a #${id} configResource`;
  }

  remove(id: string) {
    return `This action removes a #${id} configResource`;
  }
}
