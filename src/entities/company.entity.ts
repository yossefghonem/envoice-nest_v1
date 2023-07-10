import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Branch } from './branch.entity';
import { Activities } from './activity.entity';
import { User } from './user.entity';
import { License } from './license.entity';

@Entity()
export class Company extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({ default: "Egytrust ci" })
    certificate?: string;

    @Column({ unique: true })
    taxNumber?: string;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, r => r.company)
    user?: User[];

    @ApiPropertyOptional({ type: () => Branch })
    @OneToMany(() => Branch, r => r.company, { eager: true })
    branch?: Branch[];

    // @ApiPropertyOptional({ type: () => Activities })
    @ManyToOne(() => Activities, r => r.id, { eager: true })
    activity?: Activities;

    @ApiPropertyOptional({ type: () => License })
    @OneToOne(() => License, r => r.company)
    license?: License;
}
