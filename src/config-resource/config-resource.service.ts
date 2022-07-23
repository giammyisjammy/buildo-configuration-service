import { Injectable } from '@nestjs/common';
import { CreateConfigResourceDto } from './dto/create-config-resource.dto';
import { UpdateConfigResourceDto } from './dto/update-config-resource.dto';
import { ConfigResource } from './entities/config-resource.entity';

@Injectable()
export class ConfigResourceService {
  /**
   * In-memory db
   */
  private readonly configResources: ConfigResource[] = [
    new ConfigResource('test 1', 'value for test 1'),
    new ConfigResource('test 2', 'value for test 2'),
    new ConfigResource('test 3', 'value for test 3'),
  ];

  create(createConfigResourceDto: CreateConfigResourceDto): void {
    // const dto = createConfigResourceDto;

    // if (this.configResources.find((x) => x.id === dto.id)) {
    //   throw new Error(`Config with the id ${dto.id} already exists`);
    // }

    this.configResources.push(
      ConfigResource.deserialize(createConfigResourceDto),
    );
  }

  findAll(): ConfigResource[] {
    return this.configResources;
  }

  findOne(id: string): ConfigResource | null {
    return this.configResources.find((x) => x.id === id);
  }

  update(id: string, updateConfigResourceDto: UpdateConfigResourceDto) {
    const updateIndex = this.configResources.findIndex((x) => x.id === id);
    if (updateIndex === -1) throw new Error('Could not update: id not found.');

    const elementToUpdate = this.configResources[updateIndex];
    this.configResources[updateIndex] = Object.assign(
      elementToUpdate,
      updateConfigResourceDto,
    ) as ConfigResource; // TODO lookup new Object.assign type inference
  }

  remove(id: string) {
    const removeIndex = this.configResources.findIndex((x) => x.id === id);
    if (removeIndex === -1) throw new Error('Could not delete: id not found.');

    this.configResources.splice(removeIndex, 1);
  }
}
