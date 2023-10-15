import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from '../../dtos/items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { Repository } from 'typeorm';
import { ItemTypes } from '../../enums/itemTypes.enum';
import { JwtUser } from 'src/guards/jwt.strategy';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) {}

  create(body: CreateItemDto, user: JwtUser) {
    // console.log("ttt", ItemTypes[body.type]);

    return this.repo.save({
      name: body.name,
      code: body.code,
      taxCode: body.taxCode,
      type: ItemTypes[body.type],
      unit: body.unit,
      group: { id: +body.group },
      price: body.price,
      company: { id: +user.companyId },
    });
  }

  findAll(user: JwtUser) {
    // return this.repo.find({});
    return this.repo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.company', 'company')
      .where('company.id = :id', { id: user.companyId })
      .getMany();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    console.log('====================================');
    console.log('uu', updateItemDto);
    console.log('====================================');

    return this.repo.update(id, updateItemDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
