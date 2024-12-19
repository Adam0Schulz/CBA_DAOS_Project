import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Request, 
  UseGuards,
  UnauthorizedException 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@packages/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
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
  async updateUserProfile(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<{ user: User, token: string }> {
    return await this.usersService.updateUserProfile(id, updateData);
  }

  @Post(':id/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.usersService.changePassword(id, oldPassword, newPassword);
    return {
      statusCode: 200,
      message: 'Password changed successfully'
    };
  }

  @Delete(':id')
  async deleteUser(@Request() req, @Param('id') userId: string) {
    // Debug logging
    console.log('Delete Request User:', req.user);
    console.log('Requested User ID to Delete:', userId);

    // Ensure the user can only delete their own account
    if (req.user.id !== userId) {
      throw new UnauthorizedException('You can only delete your own account');
    }

    await this.usersService.deleteUser(userId);
    return { message: 'Account successfully deleted' };
  }
}