import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDetailRepository } from '../databases/repositories/userDetail.repository';
import { UserDetail } from '../databases/schemas/userDetail.schema';

@Injectable()
export class UserDetailsService {
  constructor(private readonly userDetailRepository: UserDetailRepository) {}

  async createUserDetail(data: Partial<UserDetail>) {
    return this.userDetailRepository.createUserDetail(data);
  }

  async getUserDetailByUserId(userId: Types.ObjectId) {
    return this.userDetailRepository.findUserDetailByUserId(userId);
  }

  async updateUserDetail(userId: Types.ObjectId, updateData: Partial<UserDetail>) {
    return this.userDetailRepository.updateUserDetail(userId, updateData);
  }

  async deleteUserDetail(userId: Types.ObjectId) {
    return this.userDetailRepository.deleteUserDetail(userId);
  }

  async getAllUserDetails() {
    return this.userDetailRepository.findAllUserDetails();
  }
}
