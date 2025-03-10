"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const status_entity_1 = require("./entities/status.entity");
let StatusService = class StatusService {
    constructor(StatusRepository) {
        this.StatusRepository = StatusRepository;
    }
    async createGensetStatus(dto) {
        const gensetStatus = this.StatusRepository.create(dto);
        return await this.StatusRepository.save(gensetStatus);
    }
    async getLatestGensetStatus() {
        const latestStatus = await this.StatusRepository.find({
            order: { id: 'DESC' },
            take: 1,
        });
        return latestStatus.length > 0 ? latestStatus[0] : null;
    }
    async updateByDeviceId(deviceId, updateStatusDto) {
        const config = await this.StatusRepository.findOne({
            where: {
                deviceId: deviceId,
            },
        });
        if (!config) {
            throw new common_1.BadRequestException('No Config Found');
        }
        Object.assign(config, updateStatusDto);
        await this.StatusRepository.save(config);
        return config;
    }
    async findOne(deviceId) {
        return await this.StatusRepository.findOne({ where: {
                deviceId: deviceId,
            } });
    }
};
exports.StatusService = StatusService;
exports.StatusService = StatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(status_entity_1.Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatusService);
//# sourceMappingURL=status.service.js.map