interface Player {
    name: string;
    socketId: string;
    playerUUID: string;
    archetype?: string;
    role?: string;
    coordinates?: IMemoryHex[];
}

interface IHex {
    q: number;
    r: number;
    s: number;
}

interface IMemoryHex extends IHex {
    memory?: string;
}

export { Player, IMemoryHex };
