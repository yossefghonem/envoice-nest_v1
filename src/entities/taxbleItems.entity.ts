import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tax } from './tax-type.entity';
import { SubTax } from './sub_tax.entity';
import { InvoiceLine } from './invoice-line.entity';

@Entity()
export class TaxbleItem extends OBaseEntity {
    @ApiProperty()
    @Column()
    rate?: string;

    @ApiProperty()
    @Column()
    quantity?: string;

    @ApiPropertyOptional({ type: () => Tax })
    @ManyToOne(() => Tax)
    @JoinColumn()
    taxType?: Tax;

    @ApiPropertyOptional({ type: () => SubTax })
    @ManyToOne(() => SubTax)
    @JoinColumn()
    subTax?: SubTax;

    @ManyToOne(() => InvoiceLine, L => L.id)
    line?: InvoiceLine
}