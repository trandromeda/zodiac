const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const _ = require('lodash');

const players = [];
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
let roles = ['shadow prime', 'vessel', 'explorer', 'explorer'];

let hexesWithMemories = [];

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

io.on('connection', (socket) => {
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

    socket.on('joinGame', (playerData) => {
        // TEMP: Use name instead of UUID so multiple tabs can be opened
        const existingPlayer = _.find(players, {
            name: playerData.name,
        });

        if (existingPlayer) {
            existingPlayer.socketId = socket.id;
        } else {
            players.push({
                name: playerData.name,
                socketId: socket.id,
                playerUUID: playerData.playerUUID,
            });
        }

        io.emit('currentPlayers', players);
    });

    /** @params hexes Array<{ q: number, r: number, s: number, memory: string }> */
    socket.on('newLabyrinth', (hexes) => {
        hexesWithMemories = hexes;
        socket.broadcast.emit('newLabyrinth', hexes);
    });

    socket.on('dealArchetypes', () => {
        const shuffledArchetypes = shuffle(archetypes);
        const shuffledRoles = shuffle(roles);
        const shuffledHexes = shuffle(hexesWithMemories);

        players.forEach((player, i) => {
            player['archetype'] = shuffledArchetypes[i];

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

http.listen(3000, () => console.log('Server started'));
