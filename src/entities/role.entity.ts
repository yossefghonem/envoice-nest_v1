import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role extends OBaseEntity {
    [x: string]: any;
    @Column({})
    name?: string;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, u => u.role)
    users?: User[];

    @ApiPropertyOptional({ type: () => Permission })
    @OneToMany(() => Permission, per => per.role)
    permissions?: Permission[];
}
