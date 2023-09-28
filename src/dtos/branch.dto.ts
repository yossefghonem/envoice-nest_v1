import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Country } from 'src/entities/country.entity';

export class AddressDto {
  @ApiProperty({})
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
export class CreateBranchDto {
  @ApiProperty()
  name_ar: string;

  @ApiProperty()
  name_en: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  invoiceSerial: number;

  @ApiProperty()
  company: string;

  @ApiProperty({ type: AddressDto })
  address: AddressDto;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
