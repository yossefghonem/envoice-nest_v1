import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OverrideUtils } from '../shared/override-utility';
import { OBaseEntity } from './OBaseEntity';
import { Role } from './role.entity';
import { Branch } from './branch.entity';
import { Client } from './client.entity';
import { Activities } from './activity.entity';
import { Company } from './company.entity';
import { License } from './license.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class User extends OBaseEntity {
  @Column({})
  name?: string;

  @Column({})
  email?: string;

  @Column({})
  phone?: string;

  @Column({
    nullable: false,
    transformer: {
      to: (value) => {
        if (value === null) return;
        console.log({ tt: value });
        return OverrideUtils.encryptPassword(value);
      },
      from: (value) => {
        console.log({ ff: value });
        if (value === null) return;
        return OverrideUtils.dycreptPassword(value);
      },
    },
  })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  password?: string;

  @ApiPropertyOptional({ type: () => Role })
  @ManyToOne(() => Role, (r) => r.users, { eager: true })
  role?: Role;

  @ApiPropertyOptional({ type: () => Company })
  @ManyToOne(() => Company, (r) => r.users, { eager: true })
  company?: Company;

  @ApiPropertyOptional({ type: () => Branch })
  @ManyToOne(() => Branch, (r) => r.users, { eager: true })
  branch?: Branch;

  @OneToMany(() => Invoice, (u) => u.user)
  invoices?: Invoice[];
}
