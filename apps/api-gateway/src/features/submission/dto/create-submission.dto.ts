import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the submission' })
  uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'UUID of the target' })
  targetUuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Base64-encoded image string' })
  imageBase64: string;
}
