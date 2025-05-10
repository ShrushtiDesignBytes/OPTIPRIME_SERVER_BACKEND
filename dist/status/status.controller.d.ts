import { StatusService } from "./status.service";
import { CreateStatusDto } from "./dto/status-device.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    createGensetStatus(dto: CreateStatusDto): Promise<import("src/status/entities/status.entity").Status>;
    getLatestGensetStatus(): Promise<import("src/status/entities/status.entity").Status>;
    findOne(id: string): Promise<{
        genset1Cooldown: number;
        genset2Cooldown: number;
        genset1Warmup: number;
        genset2Warmup: number;
        id: number;
        genset12Status: boolean;
        genset1Status: boolean;
        genset2Status: boolean;
        flag: string;
        device: import("src/device/entities/device.entity").Device;
        deviceId: number;
        genset1LastTurnedOff: Date;
        genset2LastTurnedOff: Date;
        genset1LastTurnedOn: Date;
        genset2LastTurnedOn: Date;
    }>;
    update(deviceId: number, updateStatusDto: UpdateStatusDto): Promise<import("src/status/entities/status.entity").Status>;
}
