import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Client extends OBaseEntity {
    @Column({})
    @ApiProperty()
    name?: string;

    @ApiProperty()
    @Column({ unique: true })
    taxNumber?: string;

    @ApiProperty()
    @Column({})
    email?: string;

    @ApiProperty()
    @Column({})
    phone?: string;

    @ApiProperty()
    @Column({})
    type?: string;

    @ApiPropertyOptional({ type: () => Address })
    @OneToOne(() => Address, { eager: true, cascade: true })
    @JoinColumn()
    address?: Address;

    @OneToMany(() => Invoice, u => u.client)
    invoices?: Invoice[];
}
