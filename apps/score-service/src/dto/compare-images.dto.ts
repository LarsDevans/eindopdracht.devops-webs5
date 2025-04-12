import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompareImagesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Image URL of the target',
    example: 'https://example.com/image.jpg',
  })
  targetImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Image URL of the submission',
    example: 'https://example.com/image.jpg',
  })
  submissionImageUrl: string;
}
