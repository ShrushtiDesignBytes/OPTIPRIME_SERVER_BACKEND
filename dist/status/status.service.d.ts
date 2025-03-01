import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { CreateStatusDto } from './dto/status-device.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class StatusService {
    private readonly StatusRepository;
    constructor(StatusRepository: Repository<Status>);
    createGensetStatus(dto: CreateStatusDto): Promise<Status>;
    getLatestGensetStatus(): Promise<Status | null>;
    update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status>;
}
