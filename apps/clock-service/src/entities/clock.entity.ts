import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('clocks')
export class Clock {
  @PrimaryColumn()
  targetUuid: string;

  @Column('int')
  durationHours: number;
}
