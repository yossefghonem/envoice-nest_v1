import { OBaseEntity } from './OBaseEntity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';




@Entity()
export class Activities extends OBaseEntity {

    @ApiProperty()
    @Column({})
    code?: string;

    @ApiProperty()
    @Column({})
    desc_en?: string;

    @ApiProperty()
    @Column({})
    desc_ar?: string;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, u => u.activity)
    users?: User[];
}
