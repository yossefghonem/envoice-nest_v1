import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../dtos/user.dto';
import { Role } from '../../entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly repo: Repository<Role>,
    ) {

    }
    async onModuleInit() {
        const adminsCount = await this.repo.count({ where: { name: "superAdmin" }, loadEagerRelations: false })
        if (adminsCount === 0) {
            const newRole: Role = {
                name: 'superAdmin',
            }
            this.repo.save(newRole)
        }
    }


    create(createUserDto: any) {
        return 'This action adds a new user';
    }

    async findAll() {
        let roles = await this.repo.find();
        return roles
    }

    getDefault() {
        return this.repo.findOne({ where: { name: 'superAdmin' } })
    }
    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: any) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
