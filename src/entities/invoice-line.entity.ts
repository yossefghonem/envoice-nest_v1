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
    quantity?: number;

    // @ApiProperty({})
    // @Column({})
    // salesTotal?: number;

    // @ApiProperty({})
    // @Column({})
    // total?: number;

    @ApiProperty({})
    @Column({})
    valueDifference?: number;

    @ApiProperty({})
    @Column({})
    totalTaxableFees?: number;

    @ApiProperty({})
    @Column({default:0})
    price?: number;

    @ApiProperty({})
    @Column({})
    itemsDiscount?: number;

    @ApiProperty({})
    @Column({})
    currencyExchangeRate?: string;

    @ApiProperty({})
    @Column({})
    discount_rate?: number;

    @ApiProperty({})
    @Column({})
    discount_amount?: number;

    @ApiProperty({})
    @Column({})
    salesTotal:number;

    @ApiProperty({})
    @Column({})
    netTotal:number;

    @ApiProperty({})
    @Column({default:"EGS"})
    internalCode: string;

    @ApiPropertyOptional({ type: () => Item })
    @ManyToOne(() => Item, { eager: true }) //!!! issue was ther y pro
    @JoinColumn({})
    item?: Item;

    @ApiPropertyOptional({ type: () => TaxbleItem })
    @OneToMany(() => TaxbleItem, i => i.line, { eager: true, cascade: true })
    taxbleItem?: TaxbleItem[];
}