//import { PartialType } from "@nestjs/mapp";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ItemTypes } from "../enums/itemTypes.enum";

export class CreateItemDto {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    code?: string;
    @ApiProperty()
    type: ItemTypes;
    @ApiProperty()
    unit?: string;
    @ApiProperty()
    price?: string;
    @ApiProperty()
    gpcCode?: string;
    @ApiProperty()
    groupId: string;
}

export class UpdateItemDto extends PartialType(CreateItemDto) { }
