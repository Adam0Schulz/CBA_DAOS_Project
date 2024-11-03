import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSeederService } from './data/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // dummy data service
  const seeder = app.get(DataSeederService);
  await seeder.seed(); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
