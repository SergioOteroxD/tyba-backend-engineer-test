import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { LocationDto } from './location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty()
  @IsString()
  @Length(1, 8)
  code: string;

  @ApiProperty()
  @IsString()
  @Length(1, 18)
  @IsOptional()
  mobileNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  @Type(() => LocationDto)
  @ValidateNested()
  location: LocationDto;
}
