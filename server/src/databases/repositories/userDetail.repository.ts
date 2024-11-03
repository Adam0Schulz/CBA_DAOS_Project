import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetail } from '../schemas/userDetail.schema';

@Injectable()
export class UserDetailRepository {
  constructor(@InjectModel('UserDetail') private userDetailModel: Model<UserDetail>) {}

  async createUserDetail(data: any): Promise<UserDetail> {
    const newUserDetail = new this.userDetailModel(data);
    return newUserDetail.save();
  }

  async findUserDetailByUserId(userId: string): Promise<UserDetail | null> {
    return this.userDetailModel.findOne({ userId }).exec();
  }

  async updateUserDetail(id: string, updateData: Partial<UserDetail>): Promise<UserDetail | null> {
    return this.userDetailModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteUserDetail(id: string): Promise<UserDetail | null> {
    return this.userDetailModel.findByIdAndDelete(id).exec();
  }
}