import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { PositionRepository } from '../databases/repositories/position.repository';
import { PositionSchema } from '../databases/schemas/position.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Position', schema: PositionSchema }]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService, PositionRepository],
  exports: [PositionsService],
})
export class PositionsModule {}
