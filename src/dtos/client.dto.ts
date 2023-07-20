
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Branch } from "../entities/branch.entity";
export class CreateClientDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    taxNumber: string

    @ApiProperty()
    phone: string

    @ApiPropertyOptional({ type: () => Branch.call })
    branch: Branch
}

export class UpdateClientDto extends PartialType(CreateClientDto) { }
