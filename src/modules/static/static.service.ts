import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activities } from '../../entities/activity.entity';
import * as activities from './../../basic-json/activities.json';
import * as units from './../../basic-json/units.json';
import * as tax_type from './../../basic-json/tax_type.json';
import * as sub_tax from './../../basic-json/sub_tax.json';
import * as countries from './../../basic-json/countries.json';

import * as fs from 'fs';
import * as pash from 'path';
// import * as gpcs from './../../basic-json/gpcCodes.json'
import { GpcCode } from '../../entities/gpcCode.entity';
import { Units } from '../../entities/units.entity';
import { Tax } from '../../entities/tax-type.entity';
import { SubTax } from './../../entities/sub_tax.entity';
import { Country } from 'src/entities/country.entity';
@Injectable()
export class StaticService {
  constructor(
    @InjectRepository(Activities)
    private readonly activityRepo: Repository<Activities>,
    @InjectRepository(GpcCode)
    private readonly gpcRepo: Repository<GpcCode>,
    @InjectRepository(Units)
    private readonly unitRepo: Repository<Units>,
    @InjectRepository(Tax)
    private readonly taxRepo: Repository<Tax>,
    @InjectRepository(SubTax)
    private readonly subTaxRepo: Repository<SubTax>,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async seedActivites() {
    if ((await this.activityRepo.count()) > 0)
      return 'activities already stored';
    return this.activityRepo.save(
      activities.map((act) => {
        return {
          code: act.code,
          desc_en: act.Desc_en,
          desc_ar: act.Desc_ar,
        } as Activities;
      }),
    );
  }

  async findAll() {
    return await this.activityRepo.find();
  }

  // ==================Gpc===============================================
  findAllGpc(search: any) {
    console.log(search);
    const qb = this.gpcRepo.createQueryBuilder('q');
    if (search.name) {
      qb.where('q.name LIKE :name', { name: `%${search.name}%` });
    }

    return qb.take(100).getMany();
  }

  async seedGpcCode() {
    if ((await this.gpcRepo.count()) > 0) return 'Gpc already stored';

    const data = fs.readFileSync(
      pash.join(__dirname, '../../basic-json', 'gpcCodes.json'),
      'utf8',
    );
    const items = JSON.parse(data);

    const batchSize = 1000; // number of items to insert at a time
    const totalItems = items.length;
    let currentBatch = 0;

    while (currentBatch < totalItems) {
      const batch: GpcCode = items.slice(
        currentBatch,
        currentBatch + batchSize,
      );
      let res = await this.gpcRepo.save(batch);
      currentBatch += batchSize;
    }

    return currentBatch;
  }

  getDefaultActivity() {
    return this.activityRepo.findOneBy({ code: '0111' });
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
    // if ((await this.unitRepo.count()) > 0) return 'units already stored';
    await this.unitRepo.delete({});
    return this.unitRepo.save(
      units.map((act) => {
        return {
          code: act.code,
          desc_en: act.desc_en,
          desc_ar: act.desc_ar,
        } as Units;
      }),
    );
  }

  async findAllUnits() {
    console.log('====================================');
    console.log('ssss');
    console.log('====================================');
    return await this.unitRepo.find();
  }

  // ==============================tax_type============================================================

  async seedTax() {
    if ((await this.taxRepo.count()) > 0) return 'tax_typ already stored';
    return this.taxRepo.save(
      tax_type.map((act) => {
        return {
          code: act.code,
          desc_en: act.desc_en,
          desc_ar: act.desc_ar,
        } as Tax;
      }),
    );
  }

  async findAllTaxes() {
    console.log('====================================');
    console.log('ssss');
    console.log('====================================');
    return await this.taxRepo.find();
  }

  //=============sub_tax================
  async seedSubTax() {
    if ((await this.subTaxRepo.count()) > 0) return 'sub_tax already stored';
    return this.subTaxRepo.save(
      sub_tax.map((act) => {
        return {
          code: act.code,
          desc_en: act.desc_en,
          desc_ar: act.desc_ar,
          taxType: { code: act.tax_code },
          tax_code: act.tax_code,
        } as SubTax;
      }),
    );
  }

  async findAllSubTax() {
    return await this.subTaxRepo.find();
  }
  //  -------------- country ----------------
  async findAllCountry() {
    return await this.countryRepo.find();
  }
  async seedCountry() {
    if ((await this.countryRepo.count()) > 0) return 'countries already stored';
    return this.countryRepo.save(
      countries.map((act) => {
        return {
          code: act.code,
          desc_en: act.Desc_en,
          desc_ar: act.Desc_ar,
        } as Country;
      }),
    );
  }
}
