import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../dtos/user.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly roleService: RoleService
  ) {

  }
  async onModuleInit() {
    const adminsCount = await this.repo.count({ where: { taxNumber: "20150012" }, loadEagerRelations: false })
    const role = await this.roleService.getDefault()
    if (adminsCount === 0) {
      const newAdmin: User = {
        name: 'المدير العام',
        email: 'admin@dev.com',
        password: '123456789',
        taxNumber: "20150012",
        phone: "01111111111",
        role: role
      }
      this.repo.save(newAdmin)
    }
  }

  async findUser(body: LoginDto): Promise<User | PromiseLike<User>> {

    let existsUser = await this.repo.findOne({
      where: [{ taxNumber: body.taxNumber }]
    });

    if (!existsUser) {
      throw new UnauthorizedException('User Not Found')
    }
    if (existsUser.password !== body.password)
      throw new UnauthorizedException('check your credintials');

    //remove password from responce
    delete existsUser.password
    existsUser["status"] = true
    return existsUser;

  }

  create(user: CreateUserDto) {
    const newUser: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      taxNumber: user.taxNumber,
      phone: user.phone,
      client_id: user.client_id,
      client_secret: user.client_secret,
      client_secret2: user.client_secret2,
      // branch: { id: +user.branchId },
      // activity: user.activity,
      role: { id: +user.role }
    }
    return this.repo.save(newUser)
  }

  async findAll() {
    let users = await this.repo.find();
    return users
  }

  async findOne(id: number) {
    let user = await this.repo.findOneBy({ id: id })

    return { ...user, role: user.role.name }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
