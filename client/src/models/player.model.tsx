import { IMemoryHex } from 'src/utils/BoardUtils';

export interface Player {
    name: string;
    playerUUID: string;
    socketId?: string;
    archetype?: string;
    role?: string;
    coordinates?: IMemoryHex[];
}
