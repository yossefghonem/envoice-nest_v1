
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { InvoiceLine } from './invoice-line.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Client } from './client.entity';
import { InvoiceStatus } from 'src/enums/invoice.enum';

@Entity()
export class Invoice extends OBaseEntity {
    @Column({default:'I'})
    documentType?: string;
   
    @Column({default:'EGP'})
    currency?: string;

    @Column({ default: '1.0' })
    version?: string;

    // @Column({})
    // docTtotalDiscountAmount?: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    totalSalesAmount: number;

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

    @ManyToOne(() => User, i => i.invoices,{eager:true})
    user: User;

    @ManyToOne(() => Client, i => i.invoices,{eager:true})
    client: Client;

    @Column({
        default:false
    })
    send?: boolean;

    @Column({
        default:null
    })
    uuid?: string;
    
    @Column({
        default:null
    })
    submissionId?: string;

    @Column({
        type:'enum',
        enum:InvoiceStatus,
        default:InvoiceStatus.PINDDING,
    })
    status?: string;
    
}