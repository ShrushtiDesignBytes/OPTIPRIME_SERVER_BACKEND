import { Device } from '../../device/entities/device.entity';
export declare class Status {
    id: number;
    genset12Status: boolean;
    genset1Status: boolean;
    genset2Status: boolean;
    flag: string;
    device: Device;
    deviceId: number;
    genset1LastTurnedOff: Date;
    genset2LastTurnedOff: Date;
    genset1LastTurnedOn: Date;
    genset2LastTurnedOn: Date;
}
