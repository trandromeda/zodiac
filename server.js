const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const _ = require('lodash');

const players = [];

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('newPlayer', (playerName, callback) => {
        if (_.find(players, { id: socket.id })) return;
        players.push({
            playerName,
            id: socket.id,
        });
        callback(playerName);
    });

    socket.on('random', function () {
        console.log('random');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(3000, () => console.log('Server started'));
