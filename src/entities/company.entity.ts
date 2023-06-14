import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Branch } from './branch.entity';
import { Activities } from './activity.entity';
import { User } from './user.entity';


@Entity()
export class Company extends OBaseEntity {
    @Column({})
    name?: string;

    @Column({ default: "Egytrust ci" })
    certificate?: string;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, r => r.company, { eager: true })
    user?: User[];

    @ApiPropertyOptional({ type: () => Branch })
    @OneToMany(() => Branch, r => r.company, { eager: true })
    branch?: Branch[];

    // @ApiPropertyOptional({ type: () => Activities })
    @ManyToOne(() => Activities, r => r.id, { eager: true })
    activity?: Activities;

}
