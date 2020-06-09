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

    io.emit('currentPlayers', players);

    socket.on('newPlayer', (playerName, callback) => {
        if (_.find(players, { id: socket.id })) return;
        players.push({
            playerName,
            id: socket.id,
        });
        callback(playerName);
        io.emit('currentPlayers', players);
    });

    socket.on('dealArchetypes', () => {
        const shuffledArchetypes = shuffle(archetypes);
        console.log(shuffledArchetypes);
        players.forEach((player, i) => {
            io.to(player.id).emit('dealtArchetype', shuffledArchetypes[i]);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => console.log('Server started'));
