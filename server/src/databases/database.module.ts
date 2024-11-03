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
    ]),
  ],
  providers: [DatabaseService, UserRepository, UserDetailRepository, EnsembleRepository],
  exports: [DatabaseService, UserRepository, UserDetailRepository, EnsembleRepository],
})
export class DatabaseModule {}
