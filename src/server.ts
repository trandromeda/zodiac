import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import _ from 'lodash';

const server = express();
const httpclient = http.createServer(server);
const io = socketio(httpclient);

interface Player {
    name: string;
    socketId: string;
    playerUUID: string;
    archetype?: string;
    role?: string;
    coordinates?: string;
}

export interface IHex {
    q: number;
    r: number;
    s: number;
}

export interface IMemoryHex extends IHex {
    memory?: string;
}

const players: Player[] = [];
let archetypes = [
    'innocent',
    'sage',
    'explorer',
    'fool',
    'lover',
    'orphan',
    'hero',
    'rebel',
    'magician',
    'ruler',
    'creator',
    'guardian',
];
const roles = ['shadow prime', 'vessel', 'explorer', 'explorer'];

let hexesWithMemories: IMemoryHex[] = [];

const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

io.on('connection', (socket: any) => {
    console.log(`A user connected: ${socket.id}`);
    archetypes = shuffle(archetypes);

    // This is better to do with a db call
    // socket.on('getPlayers', (uuid) => {
    //     const existingPlayer = _.find(players, {
    //         playerUUID: uuid,
    //     });
    //     console.log(players);
    //     if (existingPlayer) socket.emit('currentPlayers', players);
    // });

    socket.on(
        'joinGame',
        (playerData: { name: string; playerUUID: string }) => {
            // TEMP: Use name instead of UUID so multiple tabs can be opened
            const existingPlayer = _.find(players, {
                name: playerData.name,
            });

            if (existingPlayer) {
                existingPlayer.socketId = socket.id;

                socket.emit('restoreData', existingPlayer);
            } else {
                players.push({
                    name: playerData.name,
                    socketId: socket.id,
                    playerUUID: playerData.playerUUID,
                });
            }

            io.emit('currentPlayers', players);
        }
    );

    /** @params hexes Array<{ q: number, r: number, s: number, memory: string }> */
    socket.on('newLabyrinth', (hexes: IMemoryHex[]) => {
        hexesWithMemories = hexes;
        socket.broadcast.emit('newLabyrinth', hexes);
    });

    socket.on('dealArchetypes', () => {
        const shuffledArchetypes = shuffle(archetypes);
        const shuffledRoles = shuffle(roles);
        const shuffledHexes = shuffle(hexesWithMemories);

        players.forEach((player, i) => {
            player.archetype = shuffledArchetypes[i];

            io.to(player.socketId).emit('dealtArchetype', {
                archetype: shuffledArchetypes[i],
                role: shuffledRoles[i],
                coordinates: [shuffledHexes.pop(), shuffledHexes.pop()],
            });
        });

        io.emit('currentPlayers', players);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpclient.listen(3000, () => console.log('Server started'));
