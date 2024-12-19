import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InstrumentsService } from '../instruments/instruments.service';

@Injectable()
export class DataSeederService {
  private readonly logger = new Logger(DataSeederService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly instrumentsService: InstrumentsService,
  ) {}

  async seed() {
    await this.seedInstruments();
    await this.seedUsers();
  }

  private async seedUsers() {
    const existingUsers = await this.usersService.getAllUsers();
    if (existingUsers.length > 0) {
      this.logger.log('Users already populated, skipping seeding');
      return;
    }

    // Get some instruments to assign to users
    const instruments = await this.instrumentsService.getAllInstruments();
    
    const dummyUsers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        instrumentId: instruments[0]?._id,
        isOpenToWork: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        instrumentId: instruments[1]?._id,
        isOpenToWork: false,
      },
      {
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: 'thomas@example.com',
        password: 'password123',
        instrumentId: instruments[2]?._id,
        isOpenToWork: true,
      },
    ];

    for (const user of dummyUsers) {
      await this.usersService.createUser(user);
    }
    this.logger.log('Users seeded successfully');
  }

  private async seedInstruments() {
    const instruments = await this.instrumentsService.getAllInstruments();
    if (instruments.length > 0) {
      this.logger.log('Instruments already populated, skipping seeding');
      return;
    }

    const dummyInstruments = [
      { name: 'Bassoon' },
      { name: 'Cello' },
      { name: 'Clarinet' },
      { name: 'Double Bass' },
      { name: 'Flute' },
      { name: 'French Horn' },
      { name: 'Guitar' },
      { name: 'Harp' },
      { name: 'Oboe' },
      { name: 'Piano' },
      { name: 'Timpani' },
      { name: 'Trombone' },
      { name: 'Trumpet' },
      { name: 'Tuba' },
      { name: 'Viola' },
      { name: 'Violin' }
    ];

    for (const instrument of dummyInstruments) {
      await this.instrumentsService.createInstrument(instrument);
    }
    this.logger.log('Instruments seeded successfully');
  }
}
