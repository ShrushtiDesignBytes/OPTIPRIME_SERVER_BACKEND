import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createDeviceDto: CreateDeviceDto): Promise<import("src/device/entities/device.entity").Device>;
    findAll(): Promise<import("src/device/entities/device.entity").Device[]>;
    findOne(id: string): Promise<{
        device: import("src/device/entities/device.entity").Device[];
        statuses: import("src/status/entities/status.entity").Status[];
    }>;
    dashboardGraph(body: {
        type: string;
        date: string;
    }): Promise<any[]>;
    gensetGraph(body: {
        type: string;
        genset: string;
        date: string;
    }): Promise<any[]>;
    updateData(updateDeviceDto: UpdateDeviceDto): Promise<import("src/device/entities/device.entity").Device>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<import("src/device/entities/device.entity").Device>;
    remove(id: string): string;
}
