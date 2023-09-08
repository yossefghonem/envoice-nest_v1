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
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    quantity?: number;
    
    // @ApiProperty({})
    // @Column({})
    // total?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    valueDifference?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    totalTaxableFees?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    price?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    itemDiscound?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    currencyExchangeRate?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    discoundRate?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
        discount_amount?: number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    salesTotal:number;

    @ApiProperty({})
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
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