import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('submissions')
export class Submission {
  @PrimaryColumn()
  uuid: string;

  @Column()
  targetUuid: string;

  @Column()
  imageBase64: string;

  @Column()
  ownerUuid: string;
}
