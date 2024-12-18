import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDetail } from '../schemas/userDetail.schema';

@Injectable()
export class UserDetailRepository {
  constructor(
    @InjectModel('UserDetail') private userDetailModel: Model<UserDetail>,
  ) {}

  async createUserDetail(data: Partial<UserDetail>): Promise<UserDetail> {
    const userDetail = new this.userDetailModel(data);
    return userDetail.save();
  }

  async findUserDetailByUserId(userId: Types.ObjectId): Promise<UserDetail | null> {
    return this.userDetailModel.findOne({ userId }).exec();
  }

  async findUserDetailById(id: Types.ObjectId): Promise<UserDetail | null> {
    return this.userDetailModel.findById(id).exec();
  }

  async updateUserDetail(
    userId: Types.ObjectId,
    updateData: Partial<UserDetail>,
  ): Promise<UserDetail | null> {
    return this.userDetailModel
      .findOneAndUpdate(
        { userId },
        updateData,
        { new: true, runValidators: true }
      )
      .exec();
  }

  async deleteUserDetail(userId: Types.ObjectId): Promise<UserDetail | null> {
    return this.userDetailModel.findOneAndDelete({ userId }).exec();
  }

  async findAllUserDetails(): Promise<UserDetail[]> {
    return this.userDetailModel.find().exec();
  }
}
