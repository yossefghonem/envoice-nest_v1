import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';
import { Invoice } from './invoice.entity';
import { Company } from './company.entity';

@Entity()
export class Client extends OBaseEntity {
  @Column({})
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @Column({ unique: true })
  taxNumber?: string;

  @ApiProperty()
  @Column({})
  email?: string;

  @ApiProperty()
  @Column({})
  phone?: string;

  @ApiProperty()
  @Column({})
  type?: string;

  @Column({ default: '0' })
  branchId?: string;

  @ApiPropertyOptional({ type: () => Address })
  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Invoice, (u) => u.client)
  invoices?: Invoice[];

  @ApiPropertyOptional({ type: () => Company })
  @ManyToOne(() => Company, (u) => u.id)
  @JoinColumn()
  company?: Company;
}
