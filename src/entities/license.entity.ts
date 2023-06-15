import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';


@Entity()
export class License extends OBaseEntity {

    @Column()
    startDate?: Date;

    @Column()
    endDate?: Date;

    @ApiPropertyOptional({ type: () => User })
    @ManyToOne(() => User, r => r.license)
    user: User;
}
