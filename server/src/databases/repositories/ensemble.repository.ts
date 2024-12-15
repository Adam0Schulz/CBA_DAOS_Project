import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Ensemble, EnsembleCore} from '@packages/types';

@Injectable()
export class EnsembleRepository {
  constructor(
    @InjectModel('Ensemble') private ensembleModel: Model<Ensemble>,
  ) {}

  async findAll(): Promise<Ensemble[]> {
    const ensembles = await this.ensembleModel.find().populate('positions').exec();
    console.log('Ensembles fetched:', ensembles);
    return ensembles;
  }

  async createEnsemble(data: EnsembleCore): Promise<Ensemble> {
    const newEnsemble = new this.ensembleModel(data);
    return newEnsemble.save();
  }

  async findEnsembleById(id: string): Promise<Ensemble | null> {
    return this.ensembleModel.findById(id).populate('positions').exec();
  }

  async updateEnsemble(
    id: string,
    updateData: Partial<Ensemble>,
  ): Promise<Ensemble | null> {
    return this.ensembleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteEnsemble(id: string): Promise<Ensemble | null> {
    return this.ensembleModel.findByIdAndDelete(id).exec();
  }
}
