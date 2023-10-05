import { Group } from './../../entities/group.entity';
import { Injectable } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from '../../dtos/group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from 'src/guards/jwt.strategy';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private repo: Repository<Group>) {}
  create(group: CreateGroupDto, user: JwtUser) {
    group.company = { id: +user.companyId };
    return this.repo.save(group);
  }

  findAll(user: JwtUser) {
    return this.repo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.company', 'com')
      .where('com.id = :id', { id: user.companyId })
      .getMany();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.repo.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
