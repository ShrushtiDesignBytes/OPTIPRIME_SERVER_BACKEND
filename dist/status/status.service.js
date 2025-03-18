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
            order: { id: "DESC" },
            take: 1,
        });
        return latestStatus.length > 0 ? latestStatus[0] : null;
    }
    async updateByDeviceId(deviceId, updateStatusDto) {
        const currentStatus = await this.StatusRepository.findOne({
            where: { deviceId: deviceId },
        });
        if (!currentStatus) {
            throw new common_1.BadRequestException("No Config Found");
        }
        const now = new Date().getTime();
        const cooldownPeriod = parseInt(process.env.COOLDOWN_TIME, 10);
        const warmupPeriod = parseInt(process.env.WARMUP_TIME, 10);
        const checkCooldown = (lastTurnedOff, gensetName) => {
            if (!lastTurnedOff)
                return null;
            const remainingTime = cooldownPeriod - (now - lastTurnedOff.getTime());
            if (remainingTime > 0) {
                const timeLeft = Math.ceil(remainingTime / 60000);
                return {
                    message: `Genset ${gensetName} cannot be turned on yet. Please wait ${timeLeft} minutes.`,
                    source: `genset${gensetName}`,
                };
            }
            return null;
        };
        const checkWarmup = (lastTurnedOn, gensetName) => {
            if (!lastTurnedOn)
                return null;
            const remainingTime = warmupPeriod - (now - lastTurnedOn.getTime());
            if (remainingTime > 0) {
                const timeLeft = Math.ceil(remainingTime / 60000);
                return {
                    message: `Genset ${gensetName} cannot be turned off yet. Please wait ${timeLeft} minutes.`,
                    source: `genset${gensetName}`,
                };
            }
            return null;
        };
        if (updateStatusDto.genset12Status === true &&
            currentStatus.genset12Status === false &&
            updateStatusDto.genset1Status === true &&
            updateStatusDto.genset2Status === true) {
            const errors = [];
            const genset1CooldownError = checkCooldown(currentStatus.genset1LastTurnedOff, "1");
            const genset2CooldownError = checkCooldown(currentStatus.genset2LastTurnedOff, "2");
            if (genset1CooldownError)
                errors.push(genset1CooldownError.message);
            if (genset2CooldownError)
                errors.push(genset2CooldownError.message);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(errors);
            }
        }
        if (updateStatusDto.genset12Status === false &&
            currentStatus.genset12Status === true) {
            const errors = [];
            const genset1WarmupError = checkWarmup(currentStatus.genset1LastTurnedOn, "1");
            const genset2WarmupError = checkWarmup(currentStatus.genset2LastTurnedOn, "2");
            if (genset1WarmupError)
                errors.push(genset1WarmupError.message);
            if (genset2WarmupError)
                errors.push(genset2WarmupError.message);
            if (errors.length > 0) {
                throw new common_1.BadRequestException(errors);
            }
        }
        if (updateStatusDto.genset1Status === true &&
            currentStatus.genset1Status === false) {
            const genset1CooldownError = checkCooldown(currentStatus.genset1LastTurnedOff, "1");
            if (genset1CooldownError) {
                throw new common_1.BadRequestException(genset1CooldownError);
            }
        }
        if (updateStatusDto.genset1Status === false &&
            currentStatus.genset1Status === true) {
            const genset1WarmupError = checkWarmup(currentStatus.genset1LastTurnedOn, "1");
            if (genset1WarmupError) {
                throw new common_1.BadRequestException(genset1WarmupError);
            }
        }
        if (updateStatusDto.genset2Status === true &&
            currentStatus.genset2Status === false) {
            const genset2CooldownError = checkCooldown(currentStatus.genset2LastTurnedOff, "2");
            if (genset2CooldownError) {
                throw new common_1.BadRequestException(genset2CooldownError);
            }
        }
        if (updateStatusDto.genset2Status === false &&
            currentStatus.genset2Status === true) {
            const genset2WarmupError = checkWarmup(currentStatus.genset2LastTurnedOn, "2");
            if (genset2WarmupError) {
                throw new common_1.BadRequestException(genset2WarmupError);
            }
        }
        const updates = {};
        if (updateStatusDto.genset1Status !== undefined) {
            updates.genset1Status = updateStatusDto.genset1Status;
        }
        if (updateStatusDto.genset2Status !== undefined) {
            updates.genset2Status = updateStatusDto.genset2Status;
        }
        if (updateStatusDto.genset12Status !== undefined) {
            updates.genset12Status = updateStatusDto.genset12Status;
        }
        if (updateStatusDto.flag !== undefined) {
            updates.flag = updateStatusDto.flag;
        }
        if (updates.genset1Status === true && currentStatus.genset1Status === false) {
            updates.genset1LastTurnedOn = new Date();
        }
        if (updates.genset1Status === false && currentStatus.genset1Status === true) {
            updates.genset1LastTurnedOff = new Date();
        }
        if (updates.genset2Status === true && currentStatus.genset2Status === false) {
            updates.genset2LastTurnedOn = new Date();
        }
        if (updates.genset2Status === false && currentStatus.genset2Status === true) {
            updates.genset2LastTurnedOff = new Date();
        }
        Object.assign(currentStatus, updates);
        currentStatus.genset12Status =
            currentStatus.genset1Status || currentStatus.genset2Status;
        await this.StatusRepository.save(currentStatus);
        return currentStatus;
    }
    async findOne(deviceId) {
        const status = await this.StatusRepository.findOne({
            where: {
                deviceId: deviceId,
            },
        });
        if (!status) {
            throw new common_1.BadRequestException("No Config Found");
        }
        const now = new Date().getTime();
        const cooldownPeriod = parseInt(process.env.COOLDOWN_TIME, 10);
        const warmupPeriod = parseInt(process.env.WARMUP_TIME, 10);
        const calculateRemaining = (timestamp, period, checkActive = false) => {
            if (!timestamp || (checkActive && !status.genset1Status && !status.genset2Status))
                return 0;
            return Math.max(0, period - (now - timestamp.getTime()));
        };
        return {
            ...status,
            genset1Cooldown: calculateRemaining(status.genset1LastTurnedOff, cooldownPeriod),
            genset2Cooldown: calculateRemaining(status.genset2LastTurnedOff, cooldownPeriod),
            genset1Warmup: calculateRemaining(status.genset1LastTurnedOn, warmupPeriod, true),
            genset2Warmup: calculateRemaining(status.genset2LastTurnedOn, warmupPeriod, true),
        };
    }
};
exports.StatusService = StatusService;
exports.StatusService = StatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(status_entity_1.Status)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatusService);
//# sourceMappingURL=status.service.js.map