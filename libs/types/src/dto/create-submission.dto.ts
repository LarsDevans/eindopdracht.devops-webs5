import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image file in base64 format',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  })
  imageBuffer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the target' })
  targetUuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'UUID of the owner',
    example: 'd5b44a0e-3ffe-4e05-a138-ef32f8c8cc0e',
  })
  ownerUuid: string;
}
