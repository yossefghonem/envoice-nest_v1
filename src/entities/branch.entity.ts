import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';


@Entity()
export class Branch extends OBaseEntity {
    @Column({})
    name_en?: string;

    @Column({})
    name_ar?: string;

    @ApiPropertyOptional({ type: () => Address })
    @ManyToOne(() => Address, ad => ad.branch)
    address: Address[];


}
