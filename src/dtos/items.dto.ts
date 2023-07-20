//import { PartialType } from "@nestjs/mapp";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ItemTypes } from "../enums/itemTypes.enum";
import { Group } from "../entities/group.entity";

export class CreateItemDto {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    code?: string;
    @ApiProperty()
    type: ItemTypes;
    @ApiProperty({})
    unit?: string;
    @ApiProperty()
    price?: string;

    @ApiPropertyOptional({ type: () => Group })
    group: Group;
}

export class UpdateItemDto extends PartialType(CreateItemDto) { }
