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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const device_entity_1 = require("./entities/device.entity");
const status_entity_1 = require("../status/entities/status.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DeviceService = class DeviceService {
    constructor(deviceRepository, statusRepository) {
        this.deviceRepository = deviceRepository;
        this.statusRepository = statusRepository;
    }
    async create(createDeviceDto) {
        const device = this.deviceRepository.create(createDeviceDto);
        await this.deviceRepository.save(device);
        return device;
    }
    async findAll() {
        const configs = await this.deviceRepository.find({
            order: {
                created_at: 'DESC',
            },
        });
        return configs;
    }
    async findOne(deviceId) {
        const device = await this.deviceRepository.find({
            where: { deviceId }
        });
        const statuses = await this.statusRepository.find({
            where: { deviceId },
        });
        return { device, statuses };
    }
    async dashboardGraph(type, date) {
        const startDate = date ? new Date(date) : new Date();
        const endDate = date ? new Date(date) : new Date();
        const configs = [];
        for (let i = 0; i < 24; i++) {
            startDate.setUTCHours(i, 0, 0, 0);
            endDate.setUTCHours(i, 59, 59, 99);
            const config = await this.deviceRepository
                .createQueryBuilder('device')
                .select("device.common->> 'voltage' as voltage")
                .where(`device.created_at BETWEEN :startDate AND :endDate`, {
                startDate,
                endDate,
            })
                .orderBy('created_at', 'DESC')
                .getRawOne();
            configs.push({ hour: i + 1, voltage: config?.voltage || 0 });
            console.log(startDate, endDate);
        }
        return configs;
    }
    async gensetGraph(type, genset, date) {
        const startDate = date ? new Date(date) : new Date();
        const endDate = date ? new Date(date) : new Date();
        const configs = [];
        for (let i = 0; i < 24; i++) {
            startDate.setUTCHours(i, 0, 0, 0);
            endDate.setUTCHours(i, 59, 59, 99);
            const config = await this.deviceRepository
                .createQueryBuilder('device')
                .select(`${genset == '1' ? 'device.genset1' : 'device.genset2'} ->> 'power' as power`)
                .where(`device.created_at BETWEEN :startDate AND :endDate`, {
                startDate,
                endDate,
            })
                .orderBy('created_at', 'DESC')
                .getRawOne();
            configs.push({ hour: i + 1, power: config?.power || 0 });
            console.log(startDate, endDate);
        }
        return configs;
    }
    async update(id, updateDeviceDto) {
        const config = await this.deviceRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!config) {
            throw new common_1.BadRequestException('No Config Found');
        }
        Object.assign(config, updateDeviceDto);
        await this.deviceRepository.save(config);
        return config;
    }
    async updateData(updateDeviceDto) {
        const configs = await this.deviceRepository.find({ take: 1, order: { created_at: "DESC" } });
        if (!configs) {
            throw new common_1.BadRequestException('No Config Found');
        }
        const config = configs[0];
        Object.assign(config, updateDeviceDto);
        await this.deviceRepository.save(config);
        return config;
    }
    remove(id) {
        return `This action removes a #${id} device`;
    }
};
exports.DeviceService = DeviceService;
exports.DeviceService = DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(status_entity_1.Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DeviceService);
//# sourceMappingURL=device.service.js.map