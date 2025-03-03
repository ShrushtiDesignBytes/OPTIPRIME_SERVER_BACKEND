import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';
import { Status } from '../status/entities/status.entity';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private deviceRepository;
    private statusRepository;
    constructor(deviceRepository: Repository<Device>, statusRepository: Repository<Status>);
    create(createDeviceDto: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
    findOne(deviceId: number): Promise<{
        device: Device;
        statuses: Status[];
    }>;
    dashboardGraph(type: string, date: string): Promise<any[]>;
    gensetGraph(type: string, genset: string, date: string): Promise<any[]>;
    update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    updateData(updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    remove(id: number): string;
}
