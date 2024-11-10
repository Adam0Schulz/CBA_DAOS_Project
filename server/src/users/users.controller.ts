import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@packages/types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(): Promise<User[]> {
        console.log("robert is just ok enough")
        return this.usersService.getAllUsers();
    }
}