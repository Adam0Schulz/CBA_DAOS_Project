import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDetailsService } from './userDetails.service';
import { UserDetails } from '../databases/schemas/userDetails.schema';

@Controller('userDetails')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post(':userId')
  async createUserDetails(
    @Param('userId') userId: string,
    @Body() data: Partial<UserDetails>
  ) {
    return this.userDetailsService.createUserDetails(new Types.ObjectId(userId), data);
  }

  @Get(':userId')
  async getUserDetails(@Param('userId') userId: string) {
    return this.userDetailsService.getUserDetails(new Types.ObjectId(userId));
  }

  @Put(':userId')
  async updateUserDetails(
    @Param('userId') userId: string,
    @Body() data: Partial<UserDetails>
  ) {
    return this.userDetailsService.updateUserDetails(new Types.ObjectId(userId), data);
  }

  @Delete(':userId')
  async deleteUserDetails(@Param('userId') userId: string) {
    return this.userDetailsService.deleteUserDetails(new Types.ObjectId(userId));
  }
}
