import { Status } from '../../status/entities/status.entity';
interface DeviceInfo {
    [key: string]: any;
}
interface SystemInfo {
    [key: string]: any;
}
interface Genset {
    voltage: string;
    device_id: string;
    location: string;
    power: string;
    kw: string;
    kva: string;
    pf: string;
    current: string;
    enginerun: string;
    freq: string;
    engineRpm: string;
    coolerTemp: string;
    oilPressure: string;
    batteryVoltage: string;
    fuellevel: string;
    deviceInfo: DeviceInfo;
    systemInfo: SystemInfo;
}
interface Common {
    voltage: string;
    current: string;
    power: string;
    kva: string;
    freq: string;
}
export declare class Device {
    id: number;
    genset1: Genset;
    genset2: Genset;
    common: Common;
    deviceId: number;
    created_at: Date;
    updated_at: Date;
    statuses: Status[];
}
export {};
