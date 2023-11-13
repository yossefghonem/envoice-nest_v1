import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Role } from './role.entity';
import { Branch } from './branch.entity';
import { Company } from './company.entity';
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
  })
  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  password?: string;

  @Column({ default: false })
  online?: boolean;

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
