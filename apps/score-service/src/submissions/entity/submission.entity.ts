import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uuid: string;

  @Column()
  score: number;

  @Column()
  targetUuid: string;
}
