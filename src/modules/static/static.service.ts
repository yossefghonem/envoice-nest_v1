import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Activities } from '../../entities/activity.entity';
import * as activities from './../../basic-json/activities.json'
import * as units from './../../basic-json/units.json'
import * as fs from 'fs';
import * as pash from 'path';
// import * as gpcs from './../../basic-json/gpcCodes.json'
import { GpcCode } from '../../entities/gpcCode.entity';
import { Units } from '../../entities/units.entity';
@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(Activities)
    private readonly activityRepo: Repository<Activities>,
    @InjectRepository(GpcCode)
    private readonly gpcRepo: Repository<GpcCode>,
    @InjectRepository(Units)
    private readonly unitRepo: Repository<Units>
  ) { }

  async seedActivites() {
    if ((await this.activityRepo.count()) > 0)
      return "activities already stored";
    return this.activityRepo.save(activities.map((act) => {
      return {
        code: act.code,
        desc_en: act.Desc_en,
        desc_ar: act.Desc_ar,
      } as Activities
    }))
  }

  async findAll() {
    return await this.activityRepo.find()
  }

  // ==================Gpc===============================================
  findAllGpc(search: any) {
    console.log(search);
    const qb = this.gpcRepo.createQueryBuilder("q")
    if (search.name) {
      qb.where("q.name LIKE :name", { name: `%${search.name}%` })
    }

    return qb.take(100).getMany()
  }

  async seedGpcCode() {
    if ((await this.gpcRepo.count()) > 0)
      return "Gpc already stored";

    const data = fs.readFileSync(pash.join(__dirname, '../../basic-json', 'gpcCodes.json'), 'utf8');
    const items = JSON.parse(data);

    const batchSize = 1000; // number of items to insert at a time
    const totalItems = items.length
    let currentBatch = 0;

    while (currentBatch < totalItems) {
      const batch: GpcCode = items.slice(currentBatch, currentBatch + batchSize);
      let res = await this.gpcRepo.save(batch);
      currentBatch += batchSize;
    }

    return currentBatch
  }

  getDefaultActivity() {
    return this.activityRepo.findOneBy({ code: "0111" })
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

  //==========================units================================================
  async seedUnits() {
    if ((await this.unitRepo.count()) > 0)
      return "units already stored";
    return this.unitRepo.save(units.map((act) => {
      return {
        code: act.code,
        desc_en: act.desc_en,
        desc_ar: act.desc_ar,
      } as Units
    }))
  }

  async findAllUnits() {
    console.log('====================================');
    console.log("ssss");
    console.log('====================================');
    return await this.unitRepo.find()
  }
}
