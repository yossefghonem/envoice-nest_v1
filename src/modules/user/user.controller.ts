import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';

@Controller('users')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: CreateUserDto) {

    return this.userService.create(user);
  }


  @Get("all")
  findAll() {
    console.log("gey all users");
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
