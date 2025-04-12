import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Duration of the target in hours',
    example: 72,
  })
  durationHours: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Latitude near the target location',
    example: '40.4447 N',
  })
  nearbyLatitude: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Longitude near the target location',
    example: '3.9525 W',
  })
  nearbyLongitude: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    description: 'Radius in meters around the location',
    example: 200,
  })
  radiusMeters: number;
}
