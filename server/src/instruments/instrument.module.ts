import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentController } from './instrument.controller';
import { InstrumentRepository } from '../databases/repositories/instrument.repository';
import { InstrumentSchema } from '../databases/schemas/instrument.schema';
import { InstrumentsService } from './instruments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Instrument', schema: InstrumentSchema },
    ]),
  ],
  controllers: [InstrumentController],
  providers: [InstrumentRepository, InstrumentsService],
  exports: [InstrumentRepository, InstrumentsService],
})
export class InstrumentModule {}
