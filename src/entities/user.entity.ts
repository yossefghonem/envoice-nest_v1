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
    client_id?: string;

    @Column({ nullable: true })
    client_secret?: string;

    @Column({ nullable: true })
    client_secret2?: string;

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

}
