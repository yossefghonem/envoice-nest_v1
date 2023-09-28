import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { CreateBranchDto, UpdateBranchDto } from '../../dtos/branch.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('branches')
@ApiTags("Branches")
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() branch: CreateBranchDto, @Req() req: any) {
    console.log("1111111111111111", req.user);

    return this.branchService.create(branch, req.user);
  }

  @Get("all")
  // @UseGuards(JwtAuthGuard)
  findAll(@Req() req: any) {
    return  this.branchService.findAll(req.user);
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
