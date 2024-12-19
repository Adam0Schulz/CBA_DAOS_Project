import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSeederService } from './data/seed.service';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Initialize Passport
  app.use(passport.initialize());

  // Dummy data service
  const seeder = app.get(DataSeederService);
  await seeder.seed();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
