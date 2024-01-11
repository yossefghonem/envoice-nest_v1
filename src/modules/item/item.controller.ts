import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, UpdateItemDto } from '../../dtos/items.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/guards/roles.decorator';
import { UserRole } from 'src/enums/userRole.enum';

@ApiTags('Items')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Role([UserRole.USER])
  @Post()
  create(@Body() createItemDto: CreateItemDto, @Req() req: any) {
    return this.itemService.create(createItemDto, req.user);
  }

  @Role([UserRole.USER])
  @Get('all')
  findAll(@Req() req: any,
  @Query('page') page: number = 1,
  @Query('pageSize') limit: number = 1000,
  @Query('query') query: any,
  ) {
    return this.itemService.findAll(req.user, page, limit,query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
