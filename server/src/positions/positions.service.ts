import { Injectable } from '@nestjs/common';
import { PositionRepository } from '../databases/repositories/position.repository';

@Injectable()
export class PositionsService {
  constructor(private readonly positionRepository: PositionRepository) {}

  async getAllPositions() {
    return this.positionRepository.findAll();
  }

  async createPosition(data: any) {
    return this.positionRepository.createPosition(data);
  }

  async getPositionById(id: string) {
    return this.positionRepository.findPositionById(id);
  }

  async updatePosition(id: string, updateData: any) {
    return this.positionRepository.updatePosition(id, updateData);
  }

  async deletePosition(id: string) {
    return this.positionRepository.deletePosition(id);
  }
}
