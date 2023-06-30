import { Company } from './../entities/company.entity';
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    taxNumber: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    clientId: string;

    @ApiProperty()
    clientSecret1: string;

    @ApiProperty()
    clientSecret2: string;

    @ApiProperty()
    company: Company;

    @ApiProperty()
    roleId: string;

}

export class LoginDto {
    @ApiProperty()
    taxNumber: string;

    @ApiProperty()
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
