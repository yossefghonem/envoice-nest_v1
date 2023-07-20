import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Branch } from './branch.entity';


@Entity()
export class Address extends OBaseEntity {

    @Column({})
    country?: string

    @Column({})
    governerate?: string

    @Column({})
    regionCity?: string

    @Column({})
    street?: string

    @Column({})
    buildingNumber?: string

    @Column({})
    postalCode?: string

    @Column({})
    floor?: string

    @Column({})
    landmark?: string

    @Column({})
    additionalInformation?: string
}