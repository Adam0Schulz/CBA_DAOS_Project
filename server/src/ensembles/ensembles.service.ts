import { Injectable } from '@nestjs/common';
import { EnsembleRepository } from '../databases/repositories/ensemble.repository';
import {EnsembleIn} from "@packages/types";
import {PositionRepository} from "../databases/repositories/position.repository";

@Injectable()
export class EnsemblesService {
  constructor(
      private readonly ensembleRepository: EnsembleRepository,
      private readonly positionRepository: PositionRepository
  ) {}

  async getAllEnsembles() {
    return this.ensembleRepository.findAll();
  }

  async createEnsemble(data: EnsembleIn) {
    const ensemble = await this.ensembleRepository.createEnsemble({...data});
    await this.positionRepository.createPosition({
      ensembleId: ensemble.id,
      userId: data.userId,
      instrumentId: data.instrumentId,
      isOwner: true
    });
    return await this.ensembleRepository.findEnsembleById(ensemble.id);
  }

  async getEnsembleById(id: string) {
    return this.ensembleRepository.findEnsembleById(id);
  }

  async updateEnsemble(id: string, updateData: any) {
    return this.ensembleRepository.updateEnsemble(id, updateData);
  }

  async deleteEnsemble(id: string) {
    return this.ensembleRepository.deleteEnsemble(id);
  }
}
