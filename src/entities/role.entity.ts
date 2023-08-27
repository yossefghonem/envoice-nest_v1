import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { UserRole } from '../enums/userRole.enum';
@Entity()
export class Role extends OBaseEntity {
    @Column({
        // type:()=>UserRole
    })
    name?: UserRole;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, u => u.role)
    users?: User[];

    @ApiPropertyOptional({ type: () => Permission })
    @OneToMany(() => Permission, per => per.role)
    permissions?: Permission[];
}
