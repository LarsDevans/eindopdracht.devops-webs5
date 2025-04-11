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
    description: 'UUID of the owner',
    example: 'd5b44a0e-3ffe-4e05-a138-ef32f8c8cc0e',
  })
  ownerUuid: string;
}
