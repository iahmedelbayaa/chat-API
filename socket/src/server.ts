import { Server, ServerOptions, Socket } from 'socket.io';

interface User {
  userId: string;
  socketId: string;
}

interface Message {
  recipientId: string;
  senderId: string;
}

const io = new Server({
  cors: { origin: 'http://localhost:5173' },
} as Partial<ServerOptions>);

let onlineUsers: User[] = [];

io.on('connection', (socket: Socket) => {
  console.log('New connection', socket.id);

  socket.on('addNewUser', (userId: string) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });
    console.log('onlineUsers', onlineUsers);
    io.emit('getOnlineUsers', onlineUsers);
  });

  socket.on('sendMessage', (message: Message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
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
