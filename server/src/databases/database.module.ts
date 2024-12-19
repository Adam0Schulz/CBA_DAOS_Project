import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './schemas/user.schema';
import { UserDetailSchema } from './schemas/userDetail.schema';
import { EnsembleSchema } from './schemas/ensemble.schema';
import { DatabaseService } from './database.service';
import { UserRepository } from './repositories/user.repository';
import { UserDetailRepository } from './repositories/userDetail.repository';
import { EnsembleRepository } from './repositories/ensemble.repository';
import {PositionSchema} from "./schemas/position.schema";
import {PositionRepository} from "./repositories/position.repository";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserDetail', schema: UserDetailSchema },
      { name: 'Ensemble', schema: EnsembleSchema },
      { name: 'Position', schema: PositionSchema },
    ]),
  ],
  providers: [
    DatabaseService,
    UserRepository,
    UserDetailRepository,
    EnsembleRepository,
    PositionRepository
  ],
  exports: [
    DatabaseService,
    UserRepository,
    UserDetailRepository,
    EnsembleRepository,
    PositionRepository
  ],
})
export class DatabaseModule {}
