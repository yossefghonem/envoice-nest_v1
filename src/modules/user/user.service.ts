import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../../dtos/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {

  }



  async onModuleInit() {
    const adminsCount = await this.repo.count({ where: { superAdmin: true }, loadEagerRelations: false })
    if (adminsCount === 0) {
      const newAdmin: User = {
        name: 'المدير العام',
        email: 'admin@dev.com',
        password: '123456789',
        taxNumber: "20150012",
        superAdmin: true,
        mobile: "01111111111",
        role: "admin"
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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    let users = await this.repo.find();
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
