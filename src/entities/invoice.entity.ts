
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { InvoiceLine } from './invoice-line.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Client } from './client.entity';

@Entity()
export class Invoice extends OBaseEntity {
    @Column({default:'I'})
    documentType?: string;
   
    @Column({default:'EG'})
    currency?: string;

    @Column({ default: 1.0 })
    version?: string;

    @Column({})
    docTtotalDiscountAmount?: string;

    @Column({})
    totalSalesAmount: string;

    @Column({})
    internalID: string;

    @Column({})
    purchaseOrderReference: string;

    @Column({})
    purchaseOrderDescription: string;

    @Column({})
    salesOrderReference: string;

    @Column({})
    salesOrderDescription: string;

    @Column({})
    proformaInvoiceNumber: string;

    @ApiPropertyOptional({type:()=>[InvoiceLine]})
    @OneToMany(() => InvoiceLine, (invoiceLines) => invoiceLines.invoice, { cascade:true,eager: true})
    invoice_line: InvoiceLine[];

    @ManyToOne(() => User, i => i.invoices)
    user: User;

    @ManyToOne(() => Client, i => i.invoices)
    client: Client;
}