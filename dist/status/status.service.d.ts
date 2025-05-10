import { Repository } from "typeorm";
import { Status } from "./entities/status.entity";
import { CreateStatusDto } from "./dto/status-device.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
export declare class StatusService {
    private readonly StatusRepository;
    constructor(StatusRepository: Repository<Status>);
    createGensetStatus(dto: CreateStatusDto): Promise<Status>;
    getLatestGensetStatus(): Promise<Status | null>;
    updateByDeviceId(deviceId: number, updateStatusDto: UpdateStatusDto): Promise<Status>;
    findOne(deviceId: number): Promise<{
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
}
