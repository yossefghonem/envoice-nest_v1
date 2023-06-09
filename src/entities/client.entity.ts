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


    // @ApiPropertyOptional({ type: () => User })
    // @ManyToOne(() => User, u => u.clients, { eager: true })
    // user: User;

    @ApiPropertyOptional({ type: () => Branch })
    @ManyToOne(() => Branch, b => b.clients, { eager: true })
    branch: Branch;

}
