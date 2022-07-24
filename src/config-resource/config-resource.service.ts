import { Injectable } from '@nestjs/common';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';
import { ConfigResource } from './entities/config-resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigResourceService {
  constructor(
    @InjectRepository(ConfigResource)
    private readonly configResourceRepository: Repository<ConfigResource>,
  ) {}

  create(
    createConfigResourceDto: CreateConfigResourceDto,
  ): Promise<ConfigResource> {
    // const dto = createConfigResourceDto;

    // if (this.configResources.find((x) => x.id === dto.id)) {
    //   throw new Error(`Config with the id ${dto.id} already exists`);
    // }

    const newResource = ConfigResource.deserialize(createConfigResourceDto);
    return this.configResourceRepository.save(newResource);
  }

  findAll(): Promise<ConfigResource[]> {
    return this.configResourceRepository.find();
  }

  findOne(id: string): Promise<ConfigResource | null> {
    return this.configResourceRepository.findOneBy({ id: id });
  }

  async update(
    id: string,
    updateConfigResourceDto: UpdateConfigResourceDto,
  ): Promise<void> {
    await this.configResourceRepository.update(id, updateConfigResourceDto);
  }

  async remove(id: string): Promise<void> {
    await this.configResourceRepository.delete(id);
  }
}
