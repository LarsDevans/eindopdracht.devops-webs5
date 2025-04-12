import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Target } from '../targets/entities/target.entity';

@Entity('submissions')
export class Submission {
  @PrimaryColumn()
  uuid: string;

  @ManyToOne(() => Target, { eager: false })
  @JoinColumn({ name: 'targetUuid', referencedColumnName: 'uuid' })
  target: Target;

  @Column()
  targetUuid: string;

  @Column()
  imageBase64: string;

  @Column()
  ownerUuid: string;
}
