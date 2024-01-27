import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ required: false, example: 'Minh' })
  firstName: string;

  @IsOptional()
  @ApiProperty({ required: false, example: 'Minh' })
  lastName: string;
}
