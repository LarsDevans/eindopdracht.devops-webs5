import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTargetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the target' })
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the target owner' })
  ownerUuid: string;
}
