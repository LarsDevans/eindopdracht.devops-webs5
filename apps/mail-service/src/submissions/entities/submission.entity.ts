import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Target } from '../../targets/entity/target.entity';

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
  ownerUuid: string;
}
