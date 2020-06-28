import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import _ from 'lodash';

import { Player, IMemoryHex } from './interfaces';

const server = express();
const httpclient = http.createServer(server);
const io = socketio(httpclient);

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

const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

const getPublicPlayers = (publicPlayers: Player[]) => {
    return publicPlayers.map((player) => {
        return {
            name: player.name,
            playerUUID: player.playerUUID,
            archetype: player.archetype,
        };
    });
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
                socket.emit('newLabyrinth', hexesWithMemories);
            } else {
                players.push({
                    name: playerData.name,
                    playerUUID: playerData.playerUUID,
                    socketId: socket.id,
                });
            }

            io.emit('currentPlayers', getPublicPlayers(players));
        }
    );

    /** @params hexes Array<{ q: number, r: number, s: number, memory: string }> */
    socket.on('newLabyrinth', (hexes: IMemoryHex[]) => {
        hexesWithMemories = hexes;
        socket.broadcast.emit('newLabyrinth', hexes);
    });

    socket.on('requestCards', () => {
        const shuffledArchetypes = shuffle(archetypes);
        const shuffledRoles = shuffle(roles);
        const shuffledHexes = shuffle(_.cloneDeep(hexesWithMemories));

        players.forEach((player, i) => {
            player.archetype = shuffledArchetypes[i];
            player.role = shuffledRoles[i];
            player.coordinates = [shuffledHexes.pop(), shuffledHexes.pop()];

            io.to(player.socketId).emit('dealCards', {
                name: player.name,
                playerUUID: player.playerUUID,
                archetype: player.archetype,
                role: player.role,
                coordinates: player.coordinates,
            });
        });

        io.emit('currentPlayers', getPublicPlayers(players));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpclient.listen(3000, () => console.log('Server started'));
