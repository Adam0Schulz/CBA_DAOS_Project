import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@packages/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
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
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Put(':id')
  async updateUserProfile(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.updateUserProfile(id, updateData);
  }
}