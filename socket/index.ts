import { Server, ServerOptions, Socket } from 'socket.io';

interface User {
  userId: string;
  socketId: string;
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

  socket.on('sendMessage', (message: { receiverId: string }) => {
    const user = onlineUsers.find((user) => user.userId === message.receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });
});


