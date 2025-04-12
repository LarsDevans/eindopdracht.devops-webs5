import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Duration of the target in hours',
    example: '72',
  })
  durationHours: string;

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
  @IsString()
  @ApiProperty({
    description: 'Radius in meters around the location',
    example: '200',
  })
  radiusMeters: string;
}
