import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationRepository } from '../databases/repositories/application.repository';
import { ApplicationSchema } from '../databases/schemas/application.schema';
import {PositionSchema} from "../databases/schemas/position.schema";
import {PositionsService} from "../positions/positions.service";
import {PositionRepository} from "../databases/repositories/position.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Application', schema: ApplicationSchema }]),
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationRepository, PositionsService, PositionRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
