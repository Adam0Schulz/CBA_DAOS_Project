import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {ApplicationCore, ApplicationIn} from '@packages/types';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  async getAllApplications() {
    console.log('HELLO')
    return this.applicationsService.getAllApplications();
  }
  // @Get('user/:userId')
  // async getApplicationsByUser(@Param('userId') userId: string) {
  //   return this.applicationsService.getApplicationsByUser(userId);
  // }
  @Post()
  async createApplication(@Body() data: ApplicationIn) {
    return this.applicationsService.createApplication(data);
  }

  @Get(':id')
  async getApplicationById(@Param('id') id: string) {
    return this.applicationsService.getApplicationById(id);
  }

  @Put(':id')
  async updateApplication(
    @Param('id') id: string,
    @Body() updateData: Partial<ApplicationCore>,
  ) {
    return this.applicationsService.updateApplication(id, updateData);
  }

  @Delete(':id')
  async deleteApplication(@Param('id') id: string) {
    return this.applicationsService.deleteApplication(id);
  }
}
