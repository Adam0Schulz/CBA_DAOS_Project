import { Injectable } from '@nestjs/common';
import { UserRepository } from '../databases/repositories/user.repository';
import { UserCore } from '@packages/types';
import { User } from '@packages/types';
import { UserDetailRepository } from '../databases/repositories/userDetail.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDetailRepository: UserDetailRepository 
  ) {}


  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async createUser(data: UserCore): Promise<User> {
    const user = await this.userRepository.createUser(data);

    await this.userDetailRepository.createUserDetail({
      userId: user._id, 
      
      isOpenToWork: false,
    });
  
    return user;
  }

  async getUserById(id: string) {
    console.log('UsersService - Fetching user by ID:', id);
    return await this.userRepository.findUserById(id);
  }


  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async updateUserProfile(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userRepository.updateUser(id, updateData);
  }
  async getUserProfile(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    console.log('Backend User Profile:', {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    });
  
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}