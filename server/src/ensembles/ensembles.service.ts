import { Injectable } from '@nestjs/common';
import { EnsembleRepository } from '../databases/repositories/ensemble.repository';

@Injectable()
export class EnsemblesService {
  constructor(private readonly ensembleRepository: EnsembleRepository) {}

  async getAllEnsembles() {
    return this.ensembleRepository.findAll();
  }

  async createEnsemble(data: any) {
    return this.ensembleRepository.createEnsemble(data);
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
  async getEnsemblesByUser(userId: string) {
    return this.ensembleRepository.findByUserMembership(userId);
  }
}
