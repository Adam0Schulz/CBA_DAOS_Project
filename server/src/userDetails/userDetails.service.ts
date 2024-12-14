import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDetailsRepository } from '../databases/repositories/userDetails.repository';
import { UserDetails } from '../databases/schemas/userDetails.schema';

@Injectable()
export class UserDetailsService {
  constructor(private readonly userDetailsRepository: UserDetailsRepository) {}

  async createUserDetails(userId: Types.ObjectId, data: Partial<UserDetails>) {
    return this.userDetailsRepository.createUserDetails({
      ...data,
      userId,
    });
  }

  async getUserDetails(userId: Types.ObjectId) {
    return this.userDetailsRepository.findByUserId(userId);
  }

  async updateUserDetails(userId: Types.ObjectId, data: Partial<UserDetails>) {
    return this.userDetailsRepository.updateUserDetails(userId, data);
  }

  async deleteUserDetails(userId: Types.ObjectId) {
    return this.userDetailsRepository.deleteUserDetails(userId);
  }
}
