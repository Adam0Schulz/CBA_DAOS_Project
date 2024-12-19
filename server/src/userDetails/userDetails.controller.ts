import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserDetailsService } from './userDetails.service';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDetail } from '../databases/schemas/userDetail.schema';

@Controller('user-details')
@UseGuards(JwtAuthGuard)
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post()
  async createUserDetail(@Body() data: Partial<UserDetail>): Promise<UserDetail> {
    return this.userDetailsService.createUserDetail({
      ...data,
      userId: new Types.ObjectId(data.userId),
    });
  }

  @Get(':userId')
  async getUserDetail(@Param('userId') userId: string): Promise<UserDetail | null> {
    return this.userDetailsService.getUserDetailByUserId(new Types.ObjectId(userId));
  }

  @Get()
  async getAllUserDetails(): Promise<UserDetail[]> {
    return this.userDetailsService.getAllUserDetails();
  }

  @Patch(':userId')
  async updateUserDetail(
    @Param('userId') userId: string,
    @Body() updateData: Partial<UserDetail>
  ): Promise<UserDetail | null> {
    return this.userDetailsService.updateUserDetail(
      new Types.ObjectId(userId),
      updateData
    );
  }

  @Delete(':userId')
  async deleteUserDetail(@Param('userId') userId: string) {
    return this.userDetailsService.deleteUserDetail(new Types.ObjectId(userId));
  }
}
