import { OBaseEntity } from './OBaseEntity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';




@Entity()
export class GpcCode extends OBaseEntity {

    @ApiProperty()
    @Column({})
    code?: number;

    @ApiProperty()
    @Column({})
    name?: string;
}
