import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'UUID of the target',
    example: '35d7b5c2-2f26-4776-ad00-a3f7bddc7158',
  })
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Image URL of the target',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Timestamp of the target creation',
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'UUID of the owner',
    example: '35d7b5c2-2f26-4776-ad00-a3f7bddc7158',
  })
  ownerUuid: string;
}
