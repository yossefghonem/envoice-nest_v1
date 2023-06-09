import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';
import { User } from './user.entity';
import { Client } from './client.entity';


@Entity()
export class Branch extends OBaseEntity {
    @Column({})
    name_en?: string;

    @Column({})
    name_ar?: string;

    @ApiPropertyOptional({ type: () => Address })
    @ManyToOne(() => Address, ad => ad.branch)
    address?: Address[];

    @ApiPropertyOptional({ type: () => User })
    @ManyToOne(() => User, u => u.branch)
    users?: User[];

    @ApiPropertyOptional({ type: () => Client })
    @ManyToOne(() => Client, u => u.branch)
    clients?: Client[];
}
