import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() body: any) {
        const { email, name, password } = body;
        return this.usersService.createUser(email, name, password);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() body: any) {
        const { email, name, password } = body;
        return this.usersService.updateUser(id, email, name, password);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}