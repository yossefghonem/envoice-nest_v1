
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { OBaseEntity } from "./OBaseEntity";
import { ApiProperty } from "@nestjs/swagger";
import { SubTax } from "./sub_tax.entity";

@Entity()
export class Tax extends OBaseEntity {
    @ApiProperty()
    @Column({ unique: true })
    code?: string;

    @ApiProperty()
    @Column()
    desc_en?: string;

    @ApiProperty()
    @Column({ nullable: true })
    desc_ar?: string;

    @ApiProperty({ type: () => SubTax })
    @OneToMany(() => SubTax, t => t.taxType, { eager: true })
    subtax?: SubTax[];
}