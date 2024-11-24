import { Injectable } from '@nestjs/common';
import { UserRepository } from '../databases/repositories/user.repository';
import { UserCore } from '@packages/types';
import { User } from '@packages/types';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async createUser(data: UserCore) {
    return this.userRepository.createUser(data);
  }

  async getUserById(id: string) {
    return await this.userRepository.findUserById(id);
  }


  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }
}