
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    permission: [];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
