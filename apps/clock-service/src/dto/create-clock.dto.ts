import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClockDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the target' })
  targetUuid: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Duration of the target in hours',
    example: 72,
    type: 'integer',
  })
  durationHours: number;
}
