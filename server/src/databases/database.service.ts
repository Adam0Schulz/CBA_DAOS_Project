import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private client: MongoClient;

  constructor(private readonly configService: ConfigService) {}

  async connectToDb(): Promise<void> {
    const DATABASE_URL = this.configService.get<string>('DATABASE_URL');

    try {
      this.client = await MongoClient.connect(DATABASE_URL);
      console.log('Connected to MongoDB successfully');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    }
  }

  getConnection(): MongoClient {
    if (!this.client) {
      throw new Error('Error connecting to database');
    }
    return this.client;
  }

  async disconnectFromDb(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from database');
    }
  }

  async onModuleDestroy() {
    await this.disconnectFromDb();
  }
}
