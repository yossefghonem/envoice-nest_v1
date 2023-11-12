import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Branch } from './branch.entity';
import { Activities } from './activity.entity';
import { User } from './user.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Company extends OBaseEntity {
  @Column({})
  name?: string;

  @Column({ default: 'Egytrust ci' })
  certificate?: string;

  @Column({ unique: true })
  taxNumber?: string;

  @Column({ nullable: true })
  clientId?: string;

  @Column({ nullable: true })
  clientSecret1?: string;

  @Column({ nullable: true })
  clientSecret2?: string;

  @Column({ default: 'B' })
  type?: string;

  @Column({ default: 'eps2003csp11.dll' })
  dllLibPath?: string;

  @Column({ default: 0 })
  pin?: number;

  @Column({ default: new Date() })
  endDate?: Date;

  @ApiPropertyOptional({ type: () => User })
  @OneToMany(() => User, (r) => r.company)
  users?: User[];

  @ApiPropertyOptional({ type: () => Branch })
  @OneToMany(() => Branch, (r) => r.company, { eager: true })
  branch?: Branch[];

  @OneToMany(() => Invoice, (u) => u.user)
  invoices?: Invoice[];

  @ApiPropertyOptional({ type: () => Activities })
  @ManyToOne(() => Activities, (r) => r.id, { eager: true })
  activity?: Activities;

  // @ApiPropertyOptional({ type: () => License })
  // @OneToOne(() => License, (r) => r.company)
  // license?: License;
}
