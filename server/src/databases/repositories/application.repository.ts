import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Application, ApplicationCore} from '@packages/types';

@Injectable()
export class ApplicationRepository {
    constructor(
        @InjectModel('Application') private applicationModel: Model<Application>,
    ) {}

    async findAll(): Promise<Application[]> {
        const applications = await this.applicationModel.find().exec();
        console.log('Applications fetched:', applications);
        return applications;
    }

    async createApplication(data: ApplicationCore): Promise<Application> {
        console.log('repo', data)
        const newApplication = new this.applicationModel(data);
        return newApplication.save();
    }

    async findApplicationById(id: string): Promise<Application | null> {
        return this.applicationModel.findById(id).exec();
    }

    async updateApplication(
        id: string,
        updateData: Partial<Application>,
    ): Promise<Application | null> {
        return this.applicationModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
    }

    async deleteApplication(id: string): Promise<Application | null> {
        return this.applicationModel.findByIdAndDelete(id).exec();
    }

    async findApplicationsByPositionId(positionId: string): Promise<Application[]> {
        return this.applicationModel.find({ positionId }).exec();
    }
}
