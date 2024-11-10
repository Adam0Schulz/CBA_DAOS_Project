import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class DataSeederService {
  private readonly logger = new Logger(DataSeederService.name);

  constructor(private readonly usersService: UsersService) {}

  async seed() {
    const existingUsers = await this.usersService.getAllUsers();
    if (existingUsers.length > 0) {
      this.logger.log('Database already populated, skipping seeding');
      return;
    }

    const dummyUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
      },
      {
        firstName: 'Thomas',
        lastName: 'Larsen',
        email: 'thomas@example.com',
        password: 'password123',
      },
      {
        firstName: 'Julie',
        lastName: 'Jensen',
        email: 'julie@example.com',
        password: 'password123',
      },
    ];

    for (const userData of dummyUsers) {
      await this.usersService.createUser(userData);
      this.logger.log(`User: ${userData.email}`);
    }

    this.logger.log('Database populated with dummy users successfully');
  }
}
