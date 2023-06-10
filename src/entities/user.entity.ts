import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OverrideUtils } from '../shared/override-utility';
import { OBaseEntity } from './OBaseEntity';
import { Role } from './role.entity';
import { Branch } from './branch.entity';
import { Client } from './client.entity';
import { Activities } from './activity.entity';


@Entity()
export class User extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({})
    email?: string;

    @Column({ unique: true })
    taxNumber?: string;

    @Column({})
    phone: string;

    @Column({ nullable: true })
    clientId?: string;

    @Column({ nullable: true })
    clientSecret?: string;

    @Column({ nullable: true })
    clientSecret2?: string;

    @Column({
        nullable: false,
        transformer: {
            to: (value) => {
                if (value === null) return;
                return OverrideUtils.encryptPassword(value);
            },
            from: (value) => {
                if (value === null) return;
                return OverrideUtils.dycreptPassword(value);
            },
        },
    })
    @Exclude({ toPlainOnly: true })
    @ApiProperty()
    password?: string;


    @ApiPropertyOptional({ type: () => Role })
    @ManyToOne(() => Role, r => r.users, { eager: true })
    role: Role;

    @ApiPropertyOptional({ type: () => Activities })
    @ManyToOne(() => Activities, r => r.users, { eager: true })
    activity: Activities;

    @ApiPropertyOptional({ type: () => Branch })
    @ManyToOne(() => Branch, r => r.users, { eager: true })
    branch?: Branch;

}
