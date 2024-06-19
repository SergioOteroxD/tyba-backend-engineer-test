import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsOptional, IsString, IsStrongPassword, Length, ValidateNested } from 'class-validator';
import { LocationDto } from './location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterClientDto {
  @ApiProperty()
  @IsString()
  @Length(1, 30)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(1, 8)
  code: string;

  @ApiProperty()
  @IsEmail()
  @Length(3, 60)
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

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
