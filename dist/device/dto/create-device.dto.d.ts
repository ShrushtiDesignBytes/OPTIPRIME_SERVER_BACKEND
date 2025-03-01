interface GensetDTO {
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
}
interface CommonDTO {
    voltage: string;
    current: string;
    power: string;
    kva: string;
    freq: string;
}
export declare class CreateDeviceDto {
    genset1: GensetDTO;
    genset2: GensetDTO;
    common: CommonDTO;
    deviceId: number;
}
export {};
