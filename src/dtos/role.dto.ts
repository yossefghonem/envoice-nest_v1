
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty()
    name: string
}



export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
