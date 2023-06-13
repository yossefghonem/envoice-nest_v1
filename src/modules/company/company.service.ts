import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company)
    private readonly repo: Repository<Company>) { }

    create(createUserDto: any) {
        return 'This action adds a new user';
    }

    async findAll() {
        let roles = await this.repo.find();
        return roles
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
