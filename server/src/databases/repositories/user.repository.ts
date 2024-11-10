import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@packages/types';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(user: { name: string; email: string; password: string }): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
  
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
