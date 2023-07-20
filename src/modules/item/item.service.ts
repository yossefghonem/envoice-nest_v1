import { Injectable } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from '../../dtos/items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../entities/item.entity';
import { Repository } from 'typeorm';
import { ItemTypes } from '../../enums/itemTypes.enum';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private repo: Repository<Item>) { }
  create(body: CreateItemDto) {
    console.log("ttt", ItemTypes[body.type]);

    return this.repo.save({
      name: body.name,
      code: body.code,
      type: ItemTypes[body.type],
      unit: body.unit,
      group: { id: +body.group },
      price: body.price
    })
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    console.log('====================================');
    console.log("uu", updateItemDto);
    console.log('====================================');
    let it = await this.repo.update(id, updateItemDto);
    console.log('====================================');
    console.log(it);
    console.log('====================================');
    return it
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
