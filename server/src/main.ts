import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSeederService } from './data/seed.service';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  // Initialize Passport and session handling
  app.use(passport.initialize());
  app.use(passport.session());

  // Dummy data service
  const seeder = app.get(DataSeederService);
  await seeder.seed();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
