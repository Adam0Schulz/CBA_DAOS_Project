import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../databases/repositories/application.repository';
import {ApplicationIn} from "@packages/types";
import {UserDetailRepository} from "../databases/repositories/userDetail.repository";
import {Types} from "mongoose";

@Injectable()
export class ApplicationsService {
  constructor(
      private readonly applicationRepository: ApplicationRepository,
      private readonly userDetailRepository: UserDetailRepository
  ) {}

  async getAllApplications() {
    return this.applicationRepository.findAll();
  }

  async createApplication(data: ApplicationIn) {
    const application = await this.applicationRepository.createApplication({...data});
    await this.userDetailRepository.updateUserDetail(new Types.ObjectId(data.userId),{
      applicationId: application.id,
    });
    return await this.applicationRepository.findApplicationById(application.id);
  }

  async getApplicationById(id: string) {
    return this.applicationRepository.findApplicationById(id);
  }

  async updateApplication(id: string, updateData: any) {
    return this.applicationRepository.updateApplication(id, updateData);
  }

  async deleteApplication(id: string) {
    return this.applicationRepository.deleteApplication(id);
  }
}
