import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Position, PositionCore} from '@packages/types';

@Injectable()
export class PositionRepository {
  constructor(
    @InjectModel('Position') private PositionModel: Model<Position>,
  ) {}

  async findAll(): Promise<Position[]> {
    return this.PositionModel.find().exec();
  }

  async createPosition(data: PositionCore): Promise<Position> {
    const newPosition = new this.PositionModel(data);
    return newPosition.save();
  }

  async findPositionById(id: string): Promise<Position | null> {
    return this.PositionModel.findById(id).exec();
  }

  async updatePosition(
    id: string,
    updateData: Partial<Position>,
  ): Promise<Position | null> {
    return this.PositionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deletePosition(id: string): Promise<Position | null> {
    return this.PositionModel.findByIdAndDelete(id).exec();
  }
}
