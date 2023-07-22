import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';

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
    phone: string;

    @ApiPropertyOptional({ type: () => Address })
    @OneToOne(() => Address, { eager: true })
    @JoinColumn()
    address?: Address;
}
