import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailsController } from './userDetails.controller';
import { UserDetailsService } from './userDetails.service';
import { UserDetailsRepository } from '../databases/repositories/userDetails.repository';
import { UserDetailsSchema } from '../databases/schemas/userDetails.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserDetails', schema: UserDetailsSchema },
    ]),
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService, UserDetailsRepository],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
