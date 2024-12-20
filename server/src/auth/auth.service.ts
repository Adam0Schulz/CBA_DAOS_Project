import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, UserCore } from '@packages/types';
import * as bcrypt from 'bcrypt';
import { UserDetailsService } from '../userDetails/userDetails.service';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userDetailsService: UserDetailsService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    // Update last login time in user details
    const userId = typeof user._id === 'string' ? new Types.ObjectId(user._id) : user._id;
    const userDetail = await this.userDetailsService.getUserDetailByUserId(userId);
    if (userDetail) {
      await this.userDetailsService.updateUserDetail(userId, {
        lastLoggedIn: new Date()
      });
    }

    // Get the full user object to ensure we have all fields
    const fullUser = await this.usersService.getUserById(userId.toString());
    if (!fullUser) {
      throw new Error('User not found');
    }

    const payload = {
      email: user.email,
      sub: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: fullUser.createdAt // Use the createdAt from the full user object
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private validatePassword(password: string): void {
    // Check password length
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      );
    }
  }

  async register(userData: UserCore) {
    try {
      const existingUser = await this.usersService.findOneByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        throw new BadRequestException('All fields are required');
      }

      // Validate password
      this.validatePassword(userData.password);

      const hashedPassword = await this.hashPassword(userData.password);
      const userToCreate = {
        ...userData,
        password: hashedPassword
      };
      const newUser = await this.usersService.createUser(userToCreate);
      
      // Create user details for the new user
      await this.userDetailsService.createUserDetail({
        userId: new Types.ObjectId(newUser._id.toString()),
        isOpenToWork: false,
        instrumentId: null,
        applicationId: null,
        address: null,
        description: null,
        lastLoggedIn: null
      });

      const { password: _, ...result } = newUser.toObject();
      return { user: result };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
