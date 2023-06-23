import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;



}



export class UpdateGroupDto extends PartialType(CreateGroupDto) { }
