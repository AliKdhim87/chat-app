const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const formatMessage = require('./utils/messages');
const PORT = process.env.PORT || 5000;
app.use(cors());
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit(
      'message',
      formatMessage(
        'Owner',
        `${user.name}, welcome to room ${user.room}.`,
        Date.now()
      )
    );
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage('Owner', `${user.name} has joined!`, Date.now())
      );

    io.to(user.room).emit('onlineUsers', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (msg, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.name, msg, Date.now()));
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage('Owner', `${user.name} has left.`, Date.now())
      );
      io.to(user.room).emit('onlineUsers', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
