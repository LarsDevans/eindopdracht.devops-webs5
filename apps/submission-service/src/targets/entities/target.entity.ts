import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('targets')
export class Target {
  @PrimaryColumn()
  uuid: string;

  @Column({ default: false })
  closedForSubmission: boolean;
}
