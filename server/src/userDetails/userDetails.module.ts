import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDetailsController } from './userDetails.controller';
import { UserDetailsService } from './userDetails.service';
import { UserDetailRepository } from '../databases/repositories/userDetail.repository';
import { UserDetailSchema } from '../databases/schemas/userDetail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserDetail', schema: UserDetailSchema },
    ]),
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService, UserDetailRepository],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}