import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
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
        lastLoggedIn: new Date('2024-12-16T14:51:44+01:00')
      });
    }

    const payload = {
      email: user.email,
      sub: user.id || user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString()
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id || user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt.toISOString()
      }
    };
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

      if (userData.password.length < 6) {
        throw new BadRequestException('Password must be at least 6 characters long');
      }

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

      return {
        user: newUser
      };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
