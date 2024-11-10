import { Injectable } from '@nestjs/common';
import { UserRepository } from '../databases/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async createUser(data: any) {
    return this.userRepository.createUser(data);
  }

  async getUserById(id: string) {
    return await this.userRepository.findUserById(id);
  }
}
