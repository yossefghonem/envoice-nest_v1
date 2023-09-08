
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Permission } from "../entities/permission.entity";
import { UserRole } from "src/enums/userRole.enum";

export class CreateRoleDto {
    @ApiProperty({
        enum: UserRole
    })
    name: UserRole

    @ApiProperty()
    permission: Permission[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
