import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from '../../entities/license.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateLicenseDto, UpdateLicenseDto } from '../../dtos/license.dto';

@Injectable()
export class LicenseService {
  constructor(@InjectRepository(License) private repo: Repository<License>) {
  }

  async isValidLicense(userId: number): Promise<boolean> {
    // license=>company=>user
    const lic = await this.repo.createQueryBuilder("license")
      .leftJoinAndSelect("license.company", "company")
      .leftJoinAndSelect("license.user", "user")
      .where("user.id:=userId", { userId })
      .andWhere("license.endDate:>d", { d: new Date() })
      .getOne()
    return !!lic
  }

  async create(body: CreateLicenseDto) {
    let licDb = await this.repo.save({
      startDate: body.startDate,
      endDate: body.endDate,
      company: { id: +body.companyId }
    })
    return this.repo.findOneBy({ id: licDb.id });
  }

  findAll() {
    return this.repo.find()
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id })
  }

  update(id: number, updateLicenseDto: UpdateLicenseDto) {
    return this.repo.update(id, updateLicenseDto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
