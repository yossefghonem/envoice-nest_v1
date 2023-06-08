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
    client_id: string;

    @ApiProperty()
    client_secret: string;


}
