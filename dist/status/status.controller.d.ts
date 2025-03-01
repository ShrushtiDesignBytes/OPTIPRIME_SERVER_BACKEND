import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/status-device.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    createGensetStatus(dto: CreateStatusDto): Promise<import("src/status/entities/status.entity").Status>;
    getLatestGensetStatus(): Promise<import("src/status/entities/status.entity").Status>;
    update(id: string, updateStatusDto: UpdateStatusDto): Promise<import("src/status/entities/status.entity").Status>;
}
