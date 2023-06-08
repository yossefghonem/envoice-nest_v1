import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../dtos/userDto';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private readonly repo: Repository<Permission>,
    ) {

    }
    // async onModuleInit() {
    // const adminsCount = await this.repo.count({ where: { name: "superAdmin" }, loadEagerRelations: false })
    // if (adminsCount === 0) {
    //     const newAdmin: User = {
    //         name: 'superAdmin',
    //     }
    //     this.repo.save(newAdmin)
    // }
    // }


    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    async findAll() {
        let roles = await this.repo.find();
        return roles
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
