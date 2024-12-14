import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDetails } from '../schemas/userDetails.schema';

@Injectable()
export class UserDetailsRepository {
  constructor(
    @InjectModel('UserDetails') private readonly userDetailsModel: Model<UserDetails>,
  ) {}

  async createUserDetails(data: Partial<UserDetails>): Promise<UserDetails> {
    const userDetails = new this.userDetailsModel(data);
    return userDetails.save();
  }

  async findByUserId(userId: Types.ObjectId): Promise<UserDetails | null> {
    return this.userDetailsModel.findOne({ userId }).exec();
  }

  async updateUserDetails(userId: Types.ObjectId, data: Partial<UserDetails>): Promise<UserDetails | null> {
    return this.userDetailsModel
      .findOneAndUpdate(
        { userId },
        { $set: data },
        { new: true }
      )
      .exec();
  }

  async deleteUserDetails(userId: Types.ObjectId): Promise<UserDetails | null> {
    return this.userDetailsModel.findOneAndDelete({ userId }).exec();
  }
}
