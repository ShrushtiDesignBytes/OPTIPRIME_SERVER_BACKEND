import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "./entities/status.entity";
import { CreateStatusDto } from "./dto/status-device.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Injectable()
/*
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly StatusRepository: Repository<Status>
  ) {}

  async createGensetStatus(dto: CreateStatusDto): Promise<Status> {
    const gensetStatus = this.StatusRepository.create(dto);
    return await this.StatusRepository.save(gensetStatus);
  }

  async getLatestGensetStatus(): Promise<Status | null> {
    const latestStatus = await this.StatusRepository.find({
      order: { id: "DESC" },
      take: 1,
    });
    return latestStatus.length > 0 ? latestStatus[0] : null;
  }

  async updateByDeviceId(deviceId: number, updateStatusDto: UpdateStatusDto) {
    const currentStatus = await this.StatusRepository.findOne({
      where: { deviceId: deviceId },
    });
  
    if (!currentStatus) {
      throw new BadRequestException("No Config Found");
    }
  
    const now = new Date().getTime();
    const cooldownPeriod = parseInt(process.env.COOLDOWN_TIME, 10);
    const warmupPeriod = parseInt(process.env.WARMUP_TIME, 10);
  
    // Helper function to check cooldown period
    const checkCooldown = (lastTurnedOff: Date | null, gensetName: string) => {
      if (!lastTurnedOff) return null;
      
      const remainingTime = cooldownPeriod - (now - lastTurnedOff.getTime());
      if (remainingTime > 0) {
        const timeLeft = Math.ceil(remainingTime / 60000);
        return {
          message: `Genset ${gensetName} cannot be turned on yet. Please wait ${timeLeft} minutes.`,
          source: `genset${gensetName}`,
        };
      }
<<<<<<< HEAD
=======
}
*/

// updated part
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly StatusRepository: Repository<Status>
  ) {}

  async createGensetStatus(dto: CreateStatusDto): Promise<Status> {
    const gensetStatus = this.StatusRepository.create(dto);
    return await this.StatusRepository.save(gensetStatus);
  }

  async getLatestGensetStatus(): Promise<Status | null> {
    const latestStatus = await this.StatusRepository.find({
      order: { id: "DESC" },
      take: 1,
    });
    return latestStatus.length > 0 ? latestStatus[0] : null;
  }

  async updateByDeviceId(deviceId: number, updateStatusDto: UpdateStatusDto) {
    const currentStatus = await this.StatusRepository.findOne({
      where: { deviceId: deviceId },
    });
  
    if (!currentStatus) {
      throw new BadRequestException("No Config Found");
    }
  
    const now = new Date().getTime();
    const cooldownPeriod = 60000; // 1 minute
    const warmupPeriod = 60000; // 1 minute
  
    // Helper function to check cooldown period
    const checkCooldown = (lastTurnedOff: Date | null, gensetName: string) => {
      if (!lastTurnedOff) return null;
      
      const remainingTime = cooldownPeriod - (now - lastTurnedOff.getTime());
      if (remainingTime > 0) {
        const timeLeft = Math.ceil(remainingTime / 60000);
        return {
          message: `Genset ${gensetName} cannot be turned on yet. Please wait ${timeLeft} minutes.`,
          source: `genset${gensetName}`,
        };
      }
>>>>>>> 80b678963c4c33ed3d71dedc73af6e90b47865b1
      return null;
    };
  
    // Helper function to check warmup period
    const checkWarmup = (lastTurnedOn: Date | null, gensetName: string) => {
      if (!lastTurnedOn) return null;
      
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
  
    // Handle genset12 (combined control) only if explicitly turning on both
    if (
      updateStatusDto.genset12Status === true &&
      currentStatus.genset12Status === false &&
      updateStatusDto.genset1Status === true &&
      updateStatusDto.genset2Status === true
    ) {
      const errors = [];
  
      const genset1CooldownError = checkCooldown(currentStatus.genset1LastTurnedOff, "1");
      const genset2CooldownError = checkCooldown(currentStatus.genset2LastTurnedOff, "2");
  
      if (genset1CooldownError) errors.push(genset1CooldownError.message);
      if (genset2CooldownError) errors.push(genset2CooldownError.message);
  
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }
  
    // Check warmup periods when turning OFF combined gensets
    if (
      updateStatusDto.genset12Status === false &&
      currentStatus.genset12Status === true
    ) {
      const errors = [];
  
      const genset1WarmupError = checkWarmup(currentStatus.genset1LastTurnedOn, "1");
      const genset2WarmupError = checkWarmup(currentStatus.genset2LastTurnedOn, "2");
  
      if (genset1WarmupError) errors.push(genset1WarmupError.message);
      if (genset2WarmupError) errors.push(genset2WarmupError.message);
  
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }
  
    // Individual genset1 checks
    if (
      updateStatusDto.genset1Status === true &&
      currentStatus.genset1Status === false
    ) {
      const genset1CooldownError = checkCooldown(currentStatus.genset1LastTurnedOff, "1");
      if (genset1CooldownError) {
        throw new BadRequestException(genset1CooldownError);
      }
    }
  
    // Check genset1 warmup when turning off
    if (
      updateStatusDto.genset1Status === false &&
      currentStatus.genset1Status === true
    ) {
      const genset1WarmupError = checkWarmup(currentStatus.genset1LastTurnedOn, "1");
      if (genset1WarmupError) {
        throw new BadRequestException(genset1WarmupError);
      }
    }
  
    // Individual genset2 checks
    if (
      updateStatusDto.genset2Status === true &&
      currentStatus.genset2Status === false
    ) {
      const genset2CooldownError = checkCooldown(currentStatus.genset2LastTurnedOff, "2");
      if (genset2CooldownError) {
        throw new BadRequestException(genset2CooldownError);
      }
    }
  
    // Check genset2 warmup when turning off
    if (
      updateStatusDto.genset2Status === false &&
      currentStatus.genset2Status === true
    ) {
      const genset2WarmupError = checkWarmup(currentStatus.genset2LastTurnedOn, "2");
      if (genset2WarmupError) {
        throw new BadRequestException(genset2WarmupError);
      }
    }
  
<<<<<<< HEAD
    // Start with a clean updates object
    const updates: any = {};
    
    // Always check and update all relevant fields from updateStatusDto
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
  
    // Update timestamps based on status changes
    // For genset1
    if (updates.genset1Status === true && currentStatus.genset1Status === false) {
      updates.genset1LastTurnedOn = new Date();
    }
    if (updates.genset1Status === false && currentStatus.genset1Status === true) {
      updates.genset1LastTurnedOff = new Date();
    }
    
    // For genset2
    if (updates.genset2Status === true && currentStatus.genset2Status === false) {
      updates.genset2LastTurnedOn = new Date();
    }
    if (updates.genset2Status === false && currentStatus.genset2Status === true) {
=======
    // Record timestamps
    const updates: any = { ...updateStatusDto };
  
    // Update turn on/off times for gensets
    if (updateStatusDto.genset1Status === true && currentStatus.genset1Status === false) {
      updates.genset1LastTurnedOn = new Date();
    }
    if (updateStatusDto.genset1Status === false && currentStatus.genset1Status === true) {
      updates.genset1LastTurnedOff = new Date();
    }
    if (updateStatusDto.genset2Status === true && currentStatus.genset2Status === false) {
      updates.genset2LastTurnedOn = new Date();
    }
    if (updateStatusDto.genset2Status === false && currentStatus.genset2Status === true) {
>>>>>>> 80b678963c4c33ed3d71dedc73af6e90b47865b1
      updates.genset2LastTurnedOff = new Date();
    }
  
    // Apply all updates
    Object.assign(currentStatus, updates);
  
<<<<<<< HEAD
    // Always recalculate genset12Status based on individual statuses to ensure consistency
    currentStatus.genset12Status = 
=======
    // Recalculate genset12Status based on individual statuses
    currentStatus.genset12Status =
>>>>>>> 80b678963c4c33ed3d71dedc73af6e90b47865b1
      currentStatus.genset1Status || currentStatus.genset2Status;
  
    await this.StatusRepository.save(currentStatus);
    return currentStatus;
  }
  
  async findOne(deviceId: number) {
    const status = await this.StatusRepository.findOne({
      where: {
        deviceId: deviceId,
      },
    });
  
    if (!status) {
      throw new BadRequestException("No Config Found");
    }
  
    const now = new Date().getTime();
<<<<<<< HEAD
    const cooldownPeriod = parseInt(process.env.COOLDOWN_TIME, 10);
    const warmupPeriod = parseInt(process.env.WARMUP_TIME, 10);
=======
    const cooldownPeriod = 60000;
    const warmupPeriod = 60000;
>>>>>>> 80b678963c4c33ed3d71dedc73af6e90b47865b1
  
    // Calculate remaining times for all gensets
    const calculateRemaining = (timestamp: Date | null, period: number, checkActive = false) => {
    // For warmup, we need both timestamp and active status
    // For cooldown, we only need the timestamp
    if (!timestamp || (checkActive && !status.genset1Status && !status.genset2Status)) return 0;
      return Math.max(0, period - (now - timestamp.getTime()));
    };

    // Calculate cooldown and warmup information
    return {
      ...status,
      genset1Cooldown: calculateRemaining(status.genset1LastTurnedOff, cooldownPeriod),
      genset2Cooldown: calculateRemaining(status.genset2LastTurnedOff, cooldownPeriod),
      genset1Warmup: calculateRemaining(status.genset1LastTurnedOn, warmupPeriod, true),
      genset2Warmup: calculateRemaining(status.genset2LastTurnedOn, warmupPeriod, true),
    };
  }
}