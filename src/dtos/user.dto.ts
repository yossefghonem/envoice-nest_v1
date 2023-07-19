import { Role } from '../entities/role.entity';
import { Company } from './../entities/company.entity';
//import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

// export class UserCompanyDto {
//     @ApiProperty()
//     id: number
// }

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    clientId: string;

    @ApiProperty()
    clientSecret1: string;

    @ApiProperty()
    clientSecret2: string;

    @ApiPropertyOptional({ type: () => Role.call })
    role: Role;

    @ApiPropertyOptional({ type: () => Company.call })
    company?: Company;
}

export class LoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
