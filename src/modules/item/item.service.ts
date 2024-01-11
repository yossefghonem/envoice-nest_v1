import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from '../../dtos/items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { Repository } from 'typeorm';
import { ItemTypes } from '../../enums/itemTypes.enum';
import { JwtUser } from 'src/guards/jwt.strategy';
import { paginate } from 'nestjs-typeorm-paginate';

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

  findAll(user: JwtUser, page: number = 1, limit: number = 1000, query: any) {
    // return this.repo.find({});
    const items = this.repo
      .createQueryBuilder('item')
      .leftJoin('item.company', 'cop')
      .leftJoinAndSelect('item.group', 'group')
      .where('cop.id = :id', { id: user.companyId })
      .select([
        'item.id',
        'item.name',
        'item.code',
        'item.price',
        'item.taxCode',
        'item.unit',
        'group',
      ]).orderBy('item.id', 'DESC');
    // .getMany();
    return paginate(items, { limit, page });
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
