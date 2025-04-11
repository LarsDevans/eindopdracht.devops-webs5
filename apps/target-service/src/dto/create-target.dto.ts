import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetDto {
  @ApiProperty({ description: 'Base64-encoded image string' })
  imageBase64: string;

  @ApiProperty({
    description: 'Duration of the target in hours',
    example: 72,
    type: 'integer',
  })
  durationHours: number;

  @ApiProperty({
    description: 'Latitude near the target location',
    example: '40.4447° N',
  })
  nearbyLatitude: string;

  @ApiProperty({
    description: 'Longitude near the target location',
    example: '3.9525° W',
  })
  nearbyLongitude: string;

  @ApiProperty({
    description: 'Radius in meters around the location',
    example: 200,
  })
  radiusMeters: number;

  @ApiProperty({
    description: 'UUID of the owner',
    example: 'd5b44a0e-3ffe-4e05-a138-ef32f8c8cc0e',
  })
  ownerUuid: string;
}
