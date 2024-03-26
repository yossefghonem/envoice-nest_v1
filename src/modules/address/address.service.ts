import { Inject, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly repo: Repository<Address>,
  ) {}
  create(body: CreateAddressDto) {
    return this.repo.save(body);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, body: UpdateAddressDto) {
    return this.repo.update(id, body);
  }

  remove(id: number) {
    return this.repo.softDelete(id);
  }
}
