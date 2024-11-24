import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCore } from '@packages/types';

@Controller('users') // This defines the route prefix
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // This defines the GET /users endpoint
  findAll() {
    return this.usersService.getAllUsers();
  }

}
