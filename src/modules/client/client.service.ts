import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto, UpdateClientDto } from '../../dtos/client.dto';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(Client) private readonly repo: Repository<Client>) { }

    async create(client: CreateClientDto) {
        console.log(client)
        const newClient: Client = {
            name: client.name,
            taxNumber: client.taxNumber,
            phone: client.phone,
            branch: { id: +client.branch }
        }

        const clientDB = await this.repo.save(newClient)
        return await this.repo.findOneBy({ id: clientDB.id })
    }

    async findAll() {
        let clients = await this.repo.find();
        return clients
    }

    findOne(id: number) {
        const client = this.repo.findOneBy({ id: id });
        return client;
    }

    async updated(id: number, updateClientDto: UpdateClientDto) {
        return await this.repo.update(id, updateClientDto);
    }

    async remove(id: number) {
        return await this.repo.delete(id);
    }
}
