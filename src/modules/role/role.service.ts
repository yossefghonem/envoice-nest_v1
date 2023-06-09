import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../dtos/user.dto';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';

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


    async create(role: CreateRoleDto) {
        return await this.repo.save(role)
    }

    async findAll() {
        let roles = await this.repo.find();
        return roles
    }

    getDefault() {
        return this.repo.findOne({ where: { name: 'superAdmin' } })
    }
    findOne(id: number) {
        return this.repo.findOneBy({ id: id })
    }

    async update(id: number, role: UpdateRoleDto) {
        return await this.repo.update(id, role);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
