import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { UsersModule } from './users/users.module';
import { EnsemblesModule } from './ensembles/ensembles.module';
import { DataSeederService } from './data/seed.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    EnsemblesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataSeederService],
})
export class AppModule {}
