import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: false })
    genset12Status: boolean;

    @Column({ type: 'boolean', default: false })
    genset1Status: boolean;

    @Column({ type: 'boolean', default: false })
    genset2Status: boolean;

    @Column({ type: 'varchar', default: 'false' })
    flag: string;
    
}
