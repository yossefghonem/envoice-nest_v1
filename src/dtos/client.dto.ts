import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Branch } from '../entities/branch.entity';
import { Address } from '../entities/address.entity';
import { Company } from 'src/entities/company.entity';
export class CreateClientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  taxNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional({ type: () => Address.call })
  address: Address;

  @ApiPropertyOptional({ type: () => Company.call })
  company: Company;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
