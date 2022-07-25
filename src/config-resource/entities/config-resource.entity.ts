import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConfigResource {
  @PrimaryGeneratedColumn('uuid')
  public id: string; // = uuid();

  @Column()
  public name: string;

  @Column()
  public value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
