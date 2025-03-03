import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { CreateStatusDto } from './dto/status-device.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private readonly StatusRepository: Repository<Status>,
    ) { }

    async createGensetStatus(dto: CreateStatusDto): Promise<Status> {
        const gensetStatus = this.StatusRepository.create(dto);
        return await this.StatusRepository.save(gensetStatus);
    }

    async getLatestGensetStatus(): Promise<Status | null> {
        const latestStatus = await this.StatusRepository.find({
            order: { id: 'DESC' },
            take: 1, // Get only the latest record
        });

        return latestStatus.length > 0 ? latestStatus[0] : null;
    }

    async updateByDeviceId(deviceId: number, updateStatusDto: UpdateStatusDto) {
        const config = await this.StatusRepository.findOne({
            where: {
                deviceId: deviceId,
            },
        });
        if (!config) {
            throw new BadRequestException('No Config Found');
        }
        Object.assign(config, updateStatusDto);
        await this.StatusRepository.save(config);
        return config;
    }

    async findOne(deviceId: number) {
        return await this.StatusRepository.findOne({  where: {
            deviceId: deviceId,
        }});
        
      }
}
