import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../databases/repositories/user.repository';
import { UserDetailRepository } from '../databases/repositories/userDetail.repository';
import { UserCore } from '@packages/types';
import { User } from '@packages/types';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDetailRepository: UserDetailRepository,
    private readonly jwtService: JwtService
  ) {}


  async getAllUsers() {
    console.log('UsersService - Fetching all users');
    return await this.userRepository.findAllUsers();
  }

  async createUser(data: UserCore): Promise<User> {
    const user = await this.userRepository.createUser(data);
    return user;
  }

  async getUserById(id: string) {
    console.log('UsersService - Fetching user by ID:', id);
    return await this.userRepository.findUserById(id);
  }


  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async updateUserProfile(id: string, updateData: Partial<User>): Promise<{ user: User, token: string }> {
    // Update user
    const updatedUser = await this.userRepository.updateUser(id, updateData);
    
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    // Generate new token with updated information
    const token = await this.generateToken(updatedUser);

    return { 
      user: updatedUser,
      token 
    };
  }

  async generateToken(user: User): Promise<string> {
    const tokenPayload = {
      sub: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt
    };

    return this.jwtService.sign(tokenPayload);
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

  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check password length
    if (newPassword.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    // Check if new password is same as old
    if (oldPassword === newPassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.userRepository.updateUser(id, { password: hashedPassword });
  }

  async deleteUser(userId: string): Promise<void> {
    // Convert userId to ObjectId
    const userObjectId = new Types.ObjectId(userId);

    // First, delete the associated user details
    await this.userDetailRepository.deleteUserDetail(userObjectId);

    // Then delete the user
    await this.userRepository.deleteUser(userId);
  }
}