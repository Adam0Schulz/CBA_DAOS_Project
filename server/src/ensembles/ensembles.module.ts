import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';
import { EnsembleRepository } from '../databases/repositories/ensemble.repository';
import { EnsembleSchema } from '../databases/schemas/ensemble.schema';
import {PositionSchema} from "../databases/schemas/position.schema";
import {PositionsService} from "../positions/positions.service";
import {PositionRepository} from "../databases/repositories/position.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ensemble', schema: EnsembleSchema }]),
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService, EnsembleRepository, PositionsService, PositionRepository],
  exports: [EnsemblesService],
})
export class EnsemblesModule {}
