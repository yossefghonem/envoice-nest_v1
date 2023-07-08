import { ApiPropertyOptional } from "@nestjs/swagger";
import { Group } from "./group.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { OBaseEntity } from "./OBaseEntity";
import { ItemTypes } from "../enums/itemTypes.enum";
@Entity()
export class Item extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({})
    code?: string;

    @Column({
        nullable: true,
        type: 'simple-enum',
        enum: ItemTypes,
    })
    type?: ItemTypes;

    @Column({})
    unit?: string;

    @Column({})
    price?: string;

    @Column({})
    gpcCode?: string;

    @ApiPropertyOptional({ type: () => Group })
    @ManyToOne(() => Group, u => u.items)
    group: Group;
}
