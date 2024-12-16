import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserDetailsService } from './userDetails.service';
import { UserDetail } from '../databases/schemas/userDetail.schema';
import { Types } from 'mongoose';

@Controller('userDetails')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post(':userId')
  async createUserDetail(
    @Param('userId') userId: string,
    @Body() data: Partial<UserDetail>
  ) {
    return this.userDetailsService.createUserDetail({
      ...data,
      userId: new Types.ObjectId(userId),
    });
  }

  @Get(':userId')
  async getUserDetail(@Param('userId') userId: string) {
    return this.userDetailsService.getUserDetailByUserId(new Types.ObjectId(userId));
  }

  @Put(':userId')
  async updateUserDetail(
    @Param('userId') userId: string,
    @Body() updateData: Partial<UserDetail>
  ) {
    return this.userDetailsService.updateUserDetail(new Types.ObjectId(userId), updateData);
  }

  @Delete(':userId')
  async deleteUserDetail(@Param('userId') userId: string) {
    return this.userDetailsService.deleteUserDetail(new Types.ObjectId(userId));
  }
}
