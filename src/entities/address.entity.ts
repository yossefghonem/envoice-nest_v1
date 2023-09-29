import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Country } from './country.entity';

@Entity()
export class Address extends OBaseEntity {
  //   @ApiProperty()
  //   @Column({})
  //   country?: string;

  @ApiPropertyOptional({ type: () => Country })
  @ManyToOne(() => Country, (r) => r.id, { eager: true })
  // @JoinColumn({ name: 'countryId' })
  country?: Country;

  @ApiProperty()
  @Column({})
  governerate?: string;

  @ApiProperty()
  @Column({})
  regionCity?: string;

  @ApiProperty()
  @Column({})
  street?: string;

  @ApiProperty()
  @Column({})
  buildingNumber?: string;

  @ApiProperty()
  @Column({})
  postalCode?: string;

  @ApiProperty()
  @Column({})
  floor?: string;

  @ApiProperty()
  @Column({})
  landmark?: string;

  @ApiProperty()
  @Column({})
  additionalInformation?: string;

  // @ApiPropertyOptional({ type: () => Client })
  // @OneToMany(() => Client, e => e.address)
  // client?: Client;
}
