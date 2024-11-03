import { Module } from '@nestjs/common';
import { DatabaseModule } from '../databases/database.module';
import { EnsemblesService } from './ensembles.service';

@Module({
  imports: [DatabaseModule],
  providers: [EnsemblesService],
})
export class EnsemblesModule {}
