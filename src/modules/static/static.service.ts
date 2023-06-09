import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activities } from '../../entities/activity.entity';
import * as activities from './../../basic-json/activities.json'
@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(Activities)
    private readonly activityRepo: Repository<Activities>
  ) { }

  seedActivites() {
    return this.activityRepo.save(activities.map((act) => {
      return {
        code: act.code,
        desc_en: act.Desc_en,
        desc_ar: act.Desc_ar,
      } as Activities
    }))
  }

  findAll() {
    return `This action returns all static`;
  }

  findOne(id: number) {
    return `This action returns a #${id} static`;
  }

  update(id: number, updateStaticDto: any) {
    return `This action updates a #${id} static`;
  }

  remove(id: number) {
    return `This action removes a #${id} static`;
  }
}
