import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Instrument } from '../databases/schemas/instrument.schema';
import { InstrumentsService } from './instruments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('instruments')
@UseGuards(JwtAuthGuard)
export class InstrumentController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get()
  async findAll(): Promise<Instrument[]> {
    return this.instrumentsService.getAllInstruments();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Instrument> {
    return this.instrumentsService.getInstrumentById(id);
  }

  @Post()
  async create(@Body() createInstrumentDto: { name: string }): Promise<Instrument> {
    return this.instrumentsService.createInstrument(createInstrumentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInstrumentDto: { name: string },
  ): Promise<Instrument> {
    return this.instrumentsService.updateInstrument(id, updateInstrumentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Instrument> {
    return this.instrumentsService.deleteInstrument(id);
  }
}
