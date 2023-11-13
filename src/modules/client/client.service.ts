import { Injectable } from '@nestjs/common';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto, UpdateClientDto } from '../../dtos/client.dto';
import { JwtUser } from 'src/guards/jwt.strategy';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly repo: Repository<Client>,
  ) {}

  async create(client: CreateClientDto, user: JwtUser): Promise<Client> {
    console.log(client);
    const newClient: Client = {
      company: { id: +user?.companyId },
      name: client.name,
      taxNumber: client.taxNumber,
      phone: client.phone,
      email: client.email,
      type: client.type,
      address: client.address,
    };

    const clientDB = await this.repo.save(newClient);
    return await this.repo.findOneBy({ id: clientDB.id });
  }

  async findAll(user: JwtUser) {
    // let clients = await this.repo.find();
    return this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.company', 'company')
      .where('company.id = :id', { id: user?.companyId })
      .getMany();
    // return clients;
  }

  findOne(id: number) {
    const client = this.repo.findOneBy({ id: id });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto, user: JwtUser) {
    // updateClientDto.company = { id: +user?.companyId };
    return await this.repo.update(id, updateClientDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
