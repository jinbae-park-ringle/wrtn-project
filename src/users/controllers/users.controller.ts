import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/user.request.dto';
import { UserUpdateDto } from '../dto/user.update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '전체 유저 가져오기' })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: '특정 유저 가져오기' })
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: '유저 생성' })
  @ApiBody({ type: UserRequestDto })
  @Post()
  async createUser(@Body() body: UserRequestDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: '유저 정보 전체 update' })
  @ApiBody({ type: UserRequestDto })
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: UserRequestDto) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: '유저 정보 부분 update' })
  @ApiBody({ type: UserUpdateDto })
  @Patch(':id')
  async updatePartialUser(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ) {
    return this.usersService.updatePartialUser(id, body);
  }

  @ApiOperation({ summary: '유저 삭제' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
