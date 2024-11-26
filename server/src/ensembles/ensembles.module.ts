import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsemblesController } from './ensembles.controller';
import { EnsemblesService } from './ensembles.service';
import { EnsembleRepository } from '../databases/repositories/ensemble.repository';
import { EnsembleSchema } from '../databases/schemas/ensemble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ensemble', schema: EnsembleSchema }]),
  ],
  controllers: [EnsemblesController],
  providers: [EnsemblesService, EnsembleRepository],
  exports: [EnsemblesService],
})
export class EnsemblesModule {}
