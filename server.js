const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

http.listen(3000, () => console.log('Server started'));
