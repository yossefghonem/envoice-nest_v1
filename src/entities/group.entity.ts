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

import { Item } from './item.entity';
import { Company } from './company.entity';


@Entity()
export class Group extends OBaseEntity {
  @Column({})
  name?: string;

  @Column({ nullable: true })
  code?: string;

  @ApiPropertyOptional({ type: () => Item })
  @OneToMany(() => Item, (u) => u.group)
  items?: Item[];

  @ApiPropertyOptional({ type: () => Company })
  @ManyToOne(() => Company, (u) => u.id)
  @JoinColumn()
  company?: Company;
}
