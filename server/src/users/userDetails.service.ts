import { Injectable } from '@nestjs/common';
import { UserDetailRepository } from '../databases/repositories/userDetail.repository';

@Injectable()
export class UserDetailsService {
  constructor(private readonly userDetailRepository: UserDetailRepository) {}

  async createUserDetail(data: any) {
    return this.userDetailRepository.createUserDetail(data);
  }

  async getUserDetailByUserId(userId: string) {
    return this.userDetailRepository.findUserDetailByUserId(userId);
  }

  async updateUserDetail(id: string, updateData: any) {
    return this.userDetailRepository.updateUserDetail(id, updateData);
  }

  async deleteUserDetail(id: string) {
    return this.userDetailRepository.deleteUserDetail(id);
  }
}