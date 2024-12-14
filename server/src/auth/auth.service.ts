import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, UserCore } from '@packages/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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
    const payload = {
      email: user.email,
      sub: user.id || user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
      instrumentId: user.instrumentId,
      applicationId: user.applicationId,
      isOpenToWork: user.isOpenToWork
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id || user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt.toISOString(),
        instrumentId: user.instrumentId,
        applicationId: user.applicationId,
        isOpenToWork: user.isOpenToWork
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
        password: hashedPassword,
        isOpenToWork: false,
      };
      const newUser = await this.usersService.createUser(userToCreate);
      const { password, ...result } = newUser;
      return result;
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
