import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompareImagesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Image URL of the target',
    example:
      'https://imagga.com/static/images/categorization/skyline-14619_640.jpg',
  })
  targetImageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Image URL of the submission',
    example:
      'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg',
  })
  submissionImageUrl: string;
}
