// users.controller.ts

import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // This defines the route prefix
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // This defines the GET /users endpoint
  findAll() {
    return this.usersService.getAllUsers();
  }
}
