import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

class GeolocationDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;
  @ApiProperty()
  @IsNumber()
  longitude: number;
}

export class LocationDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsObject()
  @Type(() => GeolocationDto)
  @ValidateNested()
  geolocation: GeolocationDto;
}
