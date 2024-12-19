import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationRepository } from '../databases/repositories/application.repository';
import { ApplicationSchema } from '../databases/schemas/application.schema';
import {PositionSchema} from "../databases/schemas/position.schema";
import {PositionsService} from "../positions/positions.service";
import {PositionRepository} from "../databases/repositories/position.repository";
import { UserDetailSchema } from 'src/databases/schemas/userDetail.schema';
import { UserDetailRepository } from 'src/databases/repositories/userDetail.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Application', schema: ApplicationSchema }]),
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
    MongooseModule.forFeature([{ name: 'UserDetail', schema: UserDetailSchema }]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationRepository, PositionsService, PositionRepository, UserDetailRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
