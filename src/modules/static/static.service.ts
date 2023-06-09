import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
  create(createStaticDto: any) {
    return 'This action adds a new static';
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
