import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody } from '@nestjs/swagger';
import { UpdateUserRequest } from './users.module';

interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
}

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
    @ApiBody({ 
        schema: {
            type: 'object',
            properties: { 
                email: { type: 'string' },
                name: { type: 'string' },
                password: { type: 'string' },
            }
        }
    })
    async createUser(@Body() body: CreateUserRequest) {
        const { email, name, password } = body;
        return this.usersService.createUser(email, name, password);
    }

    @Put(':id')
    @ApiBody({ 
        schema: {
            type: 'object',
            properties: { 
                email: { type: 'string' },
                name: { type: 'string' },
                password: { type: 'string' },
            }
        }
    })
    async updateUser(@Param('id') id: number, @Body() body: UpdateUserRequest) {
        const { email, name, password } = body;
        const fieldsToUpdate: Partial<UpdateUserRequest> = {};
  
        if (email) fieldsToUpdate.email = email;
        if (name) fieldsToUpdate.name = name;
        if (password) fieldsToUpdate.password = password;

        return this.usersService.updateUser(id, fieldsToUpdate);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}