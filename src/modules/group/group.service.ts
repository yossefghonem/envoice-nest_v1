import { Group } from './../../entities/group.entity';
import { Injectable } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from '../../dtos/group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private repo: Repository<Group>) { }
  create(createGroupDto: CreateGroupDto) {
    return this.repo.save(createGroupDto)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.repo.update(id, updateGroupDto)
  }

  remove(id: number) {
    return this.repo.delete(id)
  }
}
