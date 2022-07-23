import { Injectable } from '@nestjs/common';
import { UpdateConfigResourceDto } from './dto';
import { ConfigResource } from './entities/config-resource.entity';

export const IN_MEMORY_DB: ConfigResource[] = [
  new ConfigResource('test 1', 'value for test 1'),
  new ConfigResource('test 2', 'value for test 2'),
  new ConfigResource('test 3', 'value for test 3'),
];

/**
 * Fake repository used to preserve the data in memory.
 * Useful only to preserve the controller/service/repository pattern,
 * will switch to TypeORM in the future.
 */
@Injectable()
export class FakeRepository<T extends ConfigResource = ConfigResource> {
  /**
   * In-memory db
   */
  readonly configResources: T[] = IN_MEMORY_DB as T[];

  save(entity: T): Promise<T> {
    this.configResources.push(entity);
    return Promise.resolve(entity);
  }

  find(): Promise<T[]> {
    return Promise.resolve(this.configResources);
  }

  findOneBy(id: string): Promise<T> {
    const found = this.configResources.find((x) => x.id === id);
    return found ? Promise.resolve(found) : Promise.reject();
  }

  update(
    id: string,
    updateConfigResourceDto: UpdateConfigResourceDto,
  ): Promise<T> {
    const updateIndex = this.configResources.findIndex((x) => x.id === id);
    if (updateIndex === -1) throw new Error('Could not update: id not found.');

    const elementToUpdate: T = this.configResources[updateIndex];
    this.configResources[updateIndex] = Object.assign(
      elementToUpdate,
      updateConfigResourceDto,
    ) as T; // TODO lookup new Object.assign type inference

    return Promise.resolve(this.configResources[updateIndex]);
  }

  delete(id: string): Promise<void> {
    const removeIndex = this.configResources.findIndex((x) => x.id === id);
    if (removeIndex === -1) throw new Error('Could not delete: id not found.');

    this.configResources.splice(removeIndex, 1);

    return Promise.resolve();
  }
}
