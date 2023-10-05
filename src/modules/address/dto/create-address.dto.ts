import { ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/entities/country.entity';

export class CreateAddressDto {
  @ApiProperty({ type: Country.call })
  country?: Country;

  @ApiProperty({})
  governerate?: string;

  @ApiProperty({})
  regionCity?: string;

  @ApiProperty({})
  street?: string;

  @ApiProperty({})
  buildingNumber?: string;

  @ApiProperty({})
  postalCode?: string;

  @ApiProperty({})
  floor?: string;

  @ApiProperty({})
  landmark?: string;

  @ApiProperty({})
  additionalInformation?: string;
}
