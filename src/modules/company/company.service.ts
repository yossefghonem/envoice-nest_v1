import { UserRole } from './../../enums/userRole.enum';
import { JwtUser } from './../../guards/jwt.strategy';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private readonly repo: Repository<Company>) { }

    async create(body: CreateCompanyDto) {
        const newComp: Company = {
            name: body.name,
            taxNumber: body.taxNumber,
            certificate: body.certificate,
            activity: { id: +body.activityCode },
        }

        let company = await this.repo.save(newComp)
        return this.repo.findOneBy({ id: company.id })
    }

    async findAll(user: JwtUser) {
        return await this.repo.find()
        // if (user.role === UserRole.SUPERADMIN)
        //     return await this.repo.find();
        // return await this.repo.createQueryBuilder("c")
        //     .leftJoin("c.user", "user")
        //     .leftJoinAndSelect("c.activity", "activities")
        //     .where("user.id = :id", { id: user.id })
        //     .getMany()
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id: id });
    }

    update(id: number, comp: UpdateCompanyDto) {
        return this.repo.update(id, comp);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
