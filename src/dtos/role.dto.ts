
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Permission } from "../entities/permission.entity";

export class CreateRoleDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    permission: Permission[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
