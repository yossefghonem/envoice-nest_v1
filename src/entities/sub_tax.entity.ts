
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { OBaseEntity } from "./OBaseEntity";
import { ApiProperty } from "@nestjs/swagger";
import { Tax } from "./tax-type.entity";

@Entity()
export class SubTax extends OBaseEntity {
    @ApiProperty()
    @Column()
    code?: string;

    @ApiProperty()
    @Column()
    desc_en?: string;

    @ApiProperty()
    @Column({ nullable: true })
    desc_ar?: string;

    @ManyToOne(() => Tax, s => s.subtax)
    @JoinColumn({ name: 'tax_code', referencedColumnName: 'code' })
    taxType?: Tax;

    @Column()
    tax_code?: string;
}