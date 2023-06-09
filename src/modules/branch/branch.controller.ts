import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { CreateBranchDto, UpdateBranchDto } from '../../dtos/branch.dto';

@Controller('branch')
@ApiTags("Branch")
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  create(@Body() branch: CreateBranchDto) {
    return this.branchService.create(branch);
  }

  @Get("all")
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() branch: UpdateBranchDto) {
    return this.branchService.update(+id, branch);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
