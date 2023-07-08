import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from '../../dtos/client.dto';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(Client) private readonly repo: Repository<Client>) { }

    create(body: CreateClientDto) {
        throw new Error('Method not implemented.');
    }

    getAll() {
        return this.repo.find();
    }

    // getAll() {
    // const clients = this.clientRepo.find({});
    //     return clients;
    // }

    // getOne(id: string){
    //     const client = this.clientRepo.findOne({_id : id});
    //     return client;
    // }

    // functions
}
