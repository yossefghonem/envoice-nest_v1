import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../../entities/branch.entity';
import { Repository } from 'typeorm';
import { CreateBranchDto, UpdateBranchDto } from '../../dtos/branch.dto';

@Injectable()
export class BranchService {

    constructor(
        @InjectRepository(Branch) private readonly repo: Repository<Branch>
    ) { }

    create(createUserDto: CreateBranchDto) {
        return 'This action adds a new user';
    }

    async findAll() {
        let users = await this.repo.find();
        return users
    }

    async findOne(id: number) {
        let user = await this.repo.findOneBy({ id: id })

        return { ...user }

    }

    update(id: number, updateUserDto: UpdateBranchDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
