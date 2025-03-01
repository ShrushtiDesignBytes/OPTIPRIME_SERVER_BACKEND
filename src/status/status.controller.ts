import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/status-device.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post()
    async createGensetStatus(@Body() dto: CreateStatusDto) {
        return await this.statusService.createGensetStatus(dto);
    }

    @Get()
    async getLatestGensetStatus() {
        return await this.statusService.getLatestGensetStatus();
    }

    @Patch(':id')
      update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
        return this.statusService.update(+id, updateStatusDto);
      }
    
}
