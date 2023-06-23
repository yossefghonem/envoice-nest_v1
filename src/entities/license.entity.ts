import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { Company } from './company.entity';


@Entity()
export class License extends OBaseEntity {

    @Column()
    startDate?: Date;

    @Column()
    endDate?: Date;

    @ApiPropertyOptional({ type: () => Company })
    @OneToOne(() => Company, r => r.license, { eager: true })
    @JoinColumn({ name: "companyId" })
    company: Company;
}
