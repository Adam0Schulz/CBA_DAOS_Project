import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instrument } from '../schemas/instrument.schema';

@Injectable()
export class InstrumentRepository {
  constructor(
    @InjectModel('Instrument') private readonly instrumentModel: Model<Instrument>,
  ) {}

  async findAll(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }

  async findById(id: string): Promise<Instrument> {
    return this.instrumentModel.findById(id).exec();
  }

  async create(instrument: Partial<Instrument>): Promise<Instrument> {
    const newInstrument = new this.instrumentModel(instrument);
    return newInstrument.save();
  }

  async update(id: string, instrument: Partial<Instrument>): Promise<Instrument> {
    return this.instrumentModel
      .findByIdAndUpdate(id, instrument, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Instrument> {
    return this.instrumentModel.findByIdAndDelete(id).exec();
  }
}
