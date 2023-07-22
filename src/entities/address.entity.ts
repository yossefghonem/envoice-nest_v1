import {
    Column,
    Entity,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Address extends OBaseEntity {
    @ApiProperty()
    @Column({})
    country?: string

    @ApiProperty()
    @Column({})
    governerate?: string

    @ApiProperty()
    @Column({})
    regionCity?: string

    @ApiProperty()
    @Column({})
    street?: string

    @ApiProperty()
    @Column({})
    buildingNumber?: string

    @ApiProperty()
    @Column({})
    postalCode?: string

    @ApiProperty()
    @Column({})
    floor?: string

    @ApiProperty()
    @Column({})
    landmark?: string

    @ApiProperty()
    @Column({})
    additionalInformation?: string

    // @ApiPropertyOptional({ type: () => Client })
    // @OneToMany(() => Client, e => e.address)
    // client?: Client;
}