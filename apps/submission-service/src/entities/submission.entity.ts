import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('submissions')
export class Submission {
  @PrimaryColumn()
  uuid: string;

  @Column()
  targetUuid: string;

  @Column()
  imageUrl: string;

  @Column()
  ownerUuid: string;
}
