
import { ApiProperty, PartialType } from "@nestjs/swagger";
export class CreateClientDto {
    @ApiProperty()
    name: string
}

export class UpdateClientDto extends PartialType(CreateClientDto) { }
