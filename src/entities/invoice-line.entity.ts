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
    @ManyToOne(() => Invoice, (invoice) => invoice.invoice_line)
    @JoinColumn({ name: 'invoiceId' }) // Add JoinColumn with the appropriate column name
    invoice: Invoice;
    

    @ApiProperty({})
    @Column({})
    quantity?: string;

    @ApiProperty({})
    @Column({})
    salesTotal?: string;

    @ApiProperty({})
    @Column({})
    total?: string;

    @ApiProperty({})
    @Column({})
    valueDifference?: string;

    @ApiProperty({})
    @Column({})
    totalTaxableFees?: string;

    @ApiProperty({})
    @Column({})
    netTotal?: string;

    @ApiProperty({})
    @Column({})
    itemsDiscount?: string;

    @ApiProperty({})
    @Column({})
    currencyExchangeRate?: string;

    @ApiProperty({})
    @Column({})
    discount_rate?: string;

    @ApiProperty({})
    @Column({})
    discount_amount?: string;

    @ApiProperty({})
    @Column({})
    internalCode: string;

    @ApiPropertyOptional({ type: () => Item })
    @ManyToOne(() => Item, { eager: true }) //!!! issue was ther y pro
    @JoinColumn({})
    item?: Item;

    @ApiPropertyOptional({ type: () => TaxbleItem })
    @OneToMany(() => TaxbleItem, i => i.line, { eager: true, cascade: true })
    taxbleItem?: TaxbleItem[];
}