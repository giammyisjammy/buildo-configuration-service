import { v4 as uuid } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConfigResource {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column()
  public name: string;

  @Column()
  public value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
