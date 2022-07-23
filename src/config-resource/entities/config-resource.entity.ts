import { v4 as uuid } from 'uuid';
import { CreateConfigResourceDto } from '@/config-resource/dto';

export interface IConfigResource {
  id: string;
  name: string;
  value: string;

  serialize(): CreateConfigResourceDto; // TODO is this really needed?
}

export class ConfigResource implements IConfigResource {
  id: string = uuid();

  constructor(public name: string, public value: string) {}

  static deserialize(dto: CreateConfigResourceDto): IConfigResource {
    const model = new ConfigResource(dto.name, dto.value);
    // model.id = dto.id;

    return model;
  }

  serialize(): CreateConfigResourceDto {
    return {
      // id: this.id,
      name: this.name,
      value: this.value,
    };
  }
}
