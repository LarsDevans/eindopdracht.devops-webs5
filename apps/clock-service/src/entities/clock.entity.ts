import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('clocks')
export class Clock {
  @PrimaryColumn()
  targetUuid: string;

  @Column({ type: 'datetime' })
  deadlineUtc: Date;

  @Column({ default: false })
  processed: boolean;
}
