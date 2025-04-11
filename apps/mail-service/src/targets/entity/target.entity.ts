import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('targets')
export class Target {
  @PrimaryColumn()
  uuid: string;

  @Column()
  ownerUuid: string;
}
