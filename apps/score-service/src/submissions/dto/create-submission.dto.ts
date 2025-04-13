import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the submission',
    example: '35d7b5c2-2f26-4776-ad00-a3f7bddc7158',
  })
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Calculated score of the submission',
    example: 85,
  })
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'UUID of the target',
    example: '35d7b5c2-2f26-4776-ad00-a3f7bddc7158',
  })
  @IsString()
  targetUuid: string;
}
