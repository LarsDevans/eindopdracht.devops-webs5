import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('targets')
export class Target {
  @PrimaryColumn()
  uuid: string;

  @Column('text')
  imageBase64: string;

  @Column('int')
  durationHours: number;

  @Column()
  nearbyLatitude: string;

  @Column()
  nearbyLongitude: string;

  @Column('int')
  radiusMeters: number;

  @Column()
  ownerUuid: string;
}
