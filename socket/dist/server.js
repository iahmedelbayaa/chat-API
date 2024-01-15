"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server({
    cors: { origin: 'http://localhost:5173' },
});
let onlineUsers = [];
io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on('addNewUser', (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({ userId, socketId: socket.id });
        console.log('onlineUsers', onlineUsers);
        io.emit('getOnlineUsers', onlineUsers);
    });
    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);
        if (user) {
            io.to(user.socketId).emit('getMessage', message);
            io.to(user.socketId).emit('getNotification', {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });
    socket.on('Disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });
});
io.listen(3001);
