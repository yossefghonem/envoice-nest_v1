
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class AddressDto {

    @ApiProperty({})
    country?: string

    @ApiProperty({})
    governerate?: string

    @ApiProperty({})
    regionCity?: string

    @ApiProperty({})
    street?: string

    @ApiProperty({})
    buildingNumber?: string

    @ApiProperty({})
    postalCode?: string

    @ApiProperty({})
    floor?: string

    @ApiProperty({})
    landmark?: string

    @ApiProperty({})
    additionalInformation?: string

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



export class UpdateBranchDto extends PartialType(CreateBranchDto) { }
