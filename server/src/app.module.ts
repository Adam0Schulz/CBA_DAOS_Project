import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { UsersModule } from './users/users.module';
import { EnsemblesModule } from './ensembles/ensembles.module';
import { DataSeederService } from './data/seed.service';
import { AuthModule } from './auth/auth.module';
import {PositionsModule} from "./positions/positions.module";
import { UserDetailsModule } from './userDetails/userDetails.module';
import { InstrumentModule } from './instruments/instrument.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    EnsemblesModule,
    PositionsModule,
    AuthModule,
    InstrumentModule,
    UserDetailsModule,
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService, DataSeederService],
})
export class AppModule {}
