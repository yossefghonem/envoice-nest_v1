import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    ManyToOne,
} from 'typeorm';
import { OverrideUtils } from '../shared/override-utility';
import { OBaseEntity } from './OBaseEntity';
import { Role } from './role.entity';
import { Branch } from './branch.entity';
import { User } from './user.entity';

@Entity()
export class Client extends OBaseEntity {
    @Column({})
    @ApiProperty()
    name?: string;

    @Column({ unique: true })
    taxNumber?: string;

    @Column({})
    phone: string;

    @ApiPropertyOptional({ type: () => Branch })
    @ManyToOne(() => Branch, b => b.clients, { eager: true })
    branch: Branch;
}
