import { Injectable } from '@nestjs/common';
import { InstrumentRepository } from '../databases/repositories/instrument.repository';
import { Instrument } from '../databases/schemas/instrument.schema';

@Injectable()
export class InstrumentsService {
  constructor(private readonly instrumentRepository: InstrumentRepository) {}

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentRepository.findAll();
  }

  async getInstrumentById(id: string): Promise<Instrument> {
    return this.instrumentRepository.findById(id);
  }

  async createInstrument(data: { name: string }): Promise<Instrument> {
    return this.instrumentRepository.create(data);
  }

  async updateInstrument(id: string, data: { name: string }): Promise<Instrument> {
    return this.instrumentRepository.update(id, data);
  }

  async deleteInstrument(id: string): Promise<Instrument> {
    return this.instrumentRepository.delete(id);
  }
}
