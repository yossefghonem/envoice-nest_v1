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
    const license = await this.repo.findOne({
      where:
      {
        user: { id: userId },
        endDate: MoreThanOrEqual(new Date())
      }
    })
    return !!license
  }

  create(body: CreateLicenseDto) {
    return this.repo.save({
      startDate: body.startDate,
      endDate: body.endDate,
      user: { id: +body.userId }
    })
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
