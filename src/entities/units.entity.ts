import { Column, Entity } from "typeorm";
import { OBaseEntity } from "./OBaseEntity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Units extends OBaseEntity {
    @ApiProperty()
    @Column()
    code?: string;

    @ApiProperty()
    @Column()
    desc_en?: string;

    @ApiProperty()
    @Column({ nullable: true })
    desc_er?: string;
}