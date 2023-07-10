import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../dtos/user.dto';
import { RoleService } from '../role/role.service';
import { Activities } from '../../entities/activity.entity';
import { StaticService } from '../static/static.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @InjectRepository(Activities) private readonly activityRepo: Repository<Activities>,
    private readonly roleService: RoleService,
    private readonly staticService: StaticService
  ) {
  }

  async onModuleInit() {
    const adminsCount = await this.repo.count({ where: { email: 'admin@dev.com' }, loadEagerRelations: false })
    const role = await this.roleService.getDefault()
    // const activity = await this.staticService.getDefaultActivity()
    if (adminsCount === 0) {
      const newAdmin: User = {
        name: 'المدير العام',
        email: 'admin@dev.com',
        password: '123456789',
        phone: "01111111111",
        role: role,
        // activity: activity
      }

      this.repo.save(newAdmin)
    }
  }

  async findUser(body: LoginDto): Promise<User | PromiseLike<User>> {
    let existsUser = await this.repo.findOne({
      where: [{ email: body.email }]
    });

    if (!existsUser) {
      throw new UnauthorizedException('User Not Found')
    }

    console.log("11", existsUser);
    console.log("22", body.password);

    if (existsUser.password !== body.password)
      throw new UnauthorizedException('check your credintials');

    //remove password from responce
    delete existsUser.password
    existsUser["status"] = true
    return existsUser;
  }

  async create(user: CreateUserDto) {
    console.log({ user });

    const newUser: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      client_id: user.clientId,
      clientSecret: user.clientSecret1,
      clientSecret2: user.clientSecret2,
      company: { id: +user.companyId },
     // branch: { id: +user.branchId },
      role: { id: +user.roleId }
    }

    return await this.repo.save(newUser)
    // let userDb = await this.repo.save(newUser)
    // return this.repo.findOneBy({ id: userDb.id });
  }

  async findAll() {
    let users = await this.repo.find();
    return users
  }

  async findOne(id: number) {
    let user = await this.repo.findOneBy({ id: id })

    return { ...user, role: user.role.name }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log({ id, updateUserDto });
    // let user: User = await this.repo.findOneBy({ id: id })
    // console.log({ user });
    // user.company = { id: 3 }

    // let newU = await this.repo.save(user)
    // return newU
    return this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
