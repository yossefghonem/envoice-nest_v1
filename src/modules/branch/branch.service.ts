import { Address } from './../../entities/address.entity';
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

    async create(branch: CreateBranchDto) {
        const address: Address = branch.address
        const newbranch: Branch = {
            name_ar: branch.name_ar,
            name_en: branch.name_en,
            code: branch.code,
            address: address,
        }
        return await this.repo.save(newbranch);
    }

    async findAll() {
        let users = await this.repo.find();
        return users
    }

    async findOne(id: number) {
        return await this.repo.findOneBy({ id: id })
    }

    async update(id: number, branch: UpdateBranchDto) {
        return await this.repo.update(id, branch)
    }

    async remove(id: number) {
        return await this.repo.delete(id)
    }
}
