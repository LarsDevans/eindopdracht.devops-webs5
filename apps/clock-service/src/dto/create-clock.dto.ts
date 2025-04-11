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
    description: 'Deadline for the target in UTC time',
    example: '2001-12-19 23:59:59',
    type: 'string',
  })
  deadlineUtc: Date;
}
