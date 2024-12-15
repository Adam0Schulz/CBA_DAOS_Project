import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';
import {Position, PositionCore} from '@packages/types';

@Controller('positions')
export class PositionsController {
  constructor(private readonly PositionsService: PositionsService) {}

  @Get()
  async getAllPositions() {
    return this.PositionsService.getAllPositions();
  }
  // @Get('user/:userId')
  // async getPositonssByUser(@Param('userId') userId: string) {
  //   return this.PositonssService.getPositonssByUser(userId);
  // }
  @Post()
  async createPositions(@Body() data: PositionCore) {
    return this.PositionsService.createPosition(data);
  }

  @Get(':id')
  async getPositionsById(@Param('id') id: string) {
    return this.PositionsService.getPositionById(id);
  }

  @Put(':id')
  async updatePositions(
    @Param('id') id: string,
    @Body() updateData: Partial<Position>,
  ) {
    return this.PositionsService.updatePosition(id, updateData);
  }

  @Delete(':id')
  async deletePositions(@Param('id') id: string) {
    return this.PositionsService.deletePosition(id);
  }
}
