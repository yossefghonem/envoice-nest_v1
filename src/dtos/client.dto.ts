
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Branch } from "../entities/branch.entity";
import { Address } from "../entities/address.entity";
export class CreateClientDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    taxNumber: string

    @ApiProperty()
    phone: string

    @ApiPropertyOptional({ type: () => Address.call })
    address: Address
}

export class UpdateClientDto extends PartialType(CreateClientDto) { }
