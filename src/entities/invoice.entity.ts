
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

    @OneToMany(() => InvoiceLine, i => i.invoice, { eager: true })
    invoiceLine?: InvoiceLine[];

    @ManyToOne(() => User, i => i.invoices)
    @JoinColumn({})
    user: User;
}