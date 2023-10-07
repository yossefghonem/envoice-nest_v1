import { ApiPropertyOptional } from '@nestjs/swagger';
import { Group } from './group.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ItemTypes } from '../enums/itemTypes.enum';
import { Company } from './company.entity';
@Entity()
export class Item extends OBaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  code?: string;

  @Column({
    nullable: true,
    type: 'simple-enum',
    enum: ItemTypes,
  })
  type?: ItemTypes;

  @Column({})
  unit?: string;

  @Column({})
  price?: string;

  @Column({
    nullable: true,
  })
  taxCode?: string;

  @ApiPropertyOptional({ type: () => Group })
  @ManyToOne(() => Group, (u) => u.items)
  group?: Group;

  @ApiPropertyOptional({ type: () => Company })
  @ManyToOne(() => Company, (u) => u.id)
  @JoinColumn()
  company?: Company;
}
