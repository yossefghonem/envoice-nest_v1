import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
} from 'typeorm';
import { OverrideUtils } from '../shared/override-utility';
import { OBaseEntity } from './OBaseEntity';


@Entity()
export class User extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({})
    role?: string;

    @Column({ nullable: true })
    mobile?: string;

    @Column({})
    email?: string;

    @Column({ unique: true })
    taxNumber?: string;

    @Column({ default: false })
    superAdmin?: boolean;

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


    // @ApiPropertyOptional({ type: () => Role })
    // @ManyToOne(() => Role, { eager: true })
    // role?: Role;

    // @ManyToOne(() => Pos, (pos) => pos.users)
    // pos: Pos;

}
