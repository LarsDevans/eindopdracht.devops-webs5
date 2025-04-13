import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('targets')
export class Target {
  @PrimaryColumn()
  uuid: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;
}
