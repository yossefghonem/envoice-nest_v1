import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';
import { User } from './user.entity';
import { Client } from './client.entity';
import { Company } from './company.entity';
import { Item } from './item.entity';


@Entity()
export class Group extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({ nullable: true })
    code?: string;

    @ApiPropertyOptional({ type: () => Item })
    @OneToMany(() => Item, u => u.group)
    items?: Item[];
}
