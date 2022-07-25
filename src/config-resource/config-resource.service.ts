import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';
import { ConfigResource } from './entities/config-resource.entity';

@Injectable()
export class ConfigResourcesService {
  constructor(
    @InjectRepository(ConfigResource)
    private readonly configResourceRepository: Repository<ConfigResource>,
  ) {}

  create(dto: CreateConfigResourceDto): Promise<ConfigResource> {
    // if (this.configResources.find((x) => x.id === dto.id)) {
    //   throw new Error(`Config with the id ${dto.id} already exists`);
    // }

    const entity = new ConfigResource(dto.name, dto.value);

    return this.configResourceRepository.save(entity);
  }

  findAll(): Promise<ConfigResource[]> {
    return this.configResourceRepository.find();
  }

  findOne(id: string): Promise<ConfigResource | null> {
    return this.configResourceRepository.findOneBy({ id: id });
  }

  async update(id: string, dto: UpdateConfigResourceDto): Promise<void> {
    const result = await this.configResourceRepository.update(id, dto);
    if (result.affected === 0) {
      throw new Error(`Config with the id ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.configResourceRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Config with the id ${id} not found`);
    }
  }
}
