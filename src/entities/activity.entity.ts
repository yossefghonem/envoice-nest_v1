import { OBaseEntity } from './OBaseEntity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';




@Entity()
export class Activities extends OBaseEntity {

    @ApiProperty()
    @Column({})
    code: string;

    @ApiProperty()
    @Column({})
    desc_en: string;

    @ApiProperty()
    @Column({})
    desc_ar: string;
}
