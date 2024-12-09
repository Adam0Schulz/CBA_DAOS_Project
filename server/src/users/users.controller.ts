import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCore } from '@packages/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const trimmedId = id.trim();
    return this.usersService.getUserById(trimmedId);
  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Put(':id')
  async updateUserProfile(@Param('id') id: string, @Body() updateData: Partial<UserCore>) {
    return this.usersService.updateUserProfile(id, updateData);
  }
}