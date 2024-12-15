import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('api/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    const newAdmin = this.adminService.create(createAdminDto);
    console.log(newAdmin);
    return newAdmin;
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.adminService.findOne(+id);
    console.log(user);
    if(user===null){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
