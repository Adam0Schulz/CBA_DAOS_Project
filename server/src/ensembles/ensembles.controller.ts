import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EnsemblesService } from './ensembles.service';
import { EnsembleCore } from '@packages/types';

@Controller('ensembles')
export class EnsemblesController {
  constructor(private readonly ensemblesService: EnsemblesService) {}

  @Get()
  async getAllEnsembles() {
    return this.ensemblesService.getAllEnsembles();
  }
  // @Get('user/:userId')
  // async getEnsemblesByUser(@Param('userId') userId: string) {
  //   return this.ensemblesService.getEnsemblesByUser(userId);
  // }
  @Post()
  async createEnsemble(@Body() data: EnsembleCore) {
    return this.ensemblesService.createEnsemble({
      ...data,
    });
  }

  @Get(':id')
  async getEnsembleById(@Param('id') id: string) {
    return this.ensemblesService.getEnsembleById(id);
  }

  @Put(':id')
  async updateEnsemble(
    @Param('id') id: string,
    @Body() updateData: Partial<EnsembleCore>,
  ) {
    return this.ensemblesService.updateEnsemble(id, updateData);
  }

  @Delete(':id')
  async deleteEnsemble(@Param('id') id: string) {
    return this.ensemblesService.deleteEnsemble(id);
  }
}
