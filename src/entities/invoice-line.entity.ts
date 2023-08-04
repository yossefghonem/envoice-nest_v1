import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Item } from './item.entity';
import { Invoice } from './invoice.entity';
import { TaxbleItem } from './taxbleItems.entity';

@Entity()
export class InvoiceLine extends OBaseEntity {
    @ApiPropertyOptional({ type:()=> Invoice })
    @ManyToOne(() => Invoice,en=>en.invoiceLines, { lazy: true })
    invoice?: Invoice;

    @Column({})
    @ApiProperty()
    quantity?: string;

    @Column({})
    @ApiProperty()
    salesTotal?: string;

    @Column({})
    @ApiProperty()
    total?: string;

    @Column({})
    @ApiProperty()
    valueDifference?: string;

    @Column({})
    @ApiProperty()
    totalTaxableFees?: string;

    @Column({})
    @ApiProperty()
    netTotal?: string;

    @Column({})
    @ApiProperty()
    itemsDiscount?: string;

    @Column({})
    @ApiProperty()
    currencyExchangeRate?: string;

    @Column({})
    @ApiProperty()
    discount_rate?: string;

    @Column({})
    @ApiProperty()
    discount_amount?: string;

    @Column({})
    @ApiProperty()
    internalCode: string;

    @ApiPropertyOptional({ type: () => Item })
    @OneToOne(() => Item, { eager: true })
    @JoinColumn({})
    item?: Item;

    @ApiPropertyOptional({ type: () => TaxbleItem })
    @OneToMany(() => TaxbleItem, i => i.lines, { eager: true, cascade: true })
    taxbleItem?: TaxbleItem[];
}