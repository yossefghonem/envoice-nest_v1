
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

@Entity()
export class Invoice extends OBaseEntity {

    @Column({})
    documentType?: string;

    @Column({ default: 1.0 })
    version?: string;

    @Column({})
    docTtotalDiscountAmount?: string;

    @Column({})
    totalSalesAmount: string;

    @Column({})
    netAmount?: string;

    @Column({})
    internalID: string;

    @ApiPropertyOptional({type:()=>[InvoiceLine]})
    @OneToMany(() => InvoiceLine, (invoiceLines) => invoiceLines.invoice, { cascade:['insert','update'],eager: true})
    invoice_line: InvoiceLine[];

    @ManyToOne(() => User, i => i.invoices)
    // @JoinColumn({})
    user: User;
}