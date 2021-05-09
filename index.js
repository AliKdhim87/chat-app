// @ts-check
const express = require("express")
const { Server } = require("socket.io")
const http = require("http")

const common = require("./utils/common")
const config = common.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: config.CLIENT_URL,
    methods: ["GET", "POST"],
  },
})

const formatMessage = require("./utils/messages")
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users")

const PORT = process.env.PORT || 5000

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit(
      "message",
      formatMessage("Owner", `${user.name}, welcome to room ${user.room}.`)
    )
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessage("Owner", `${user.name} has joined!`))

    io.to(user.room).emit("onlineUsers", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on("sendMessage", (msg) => {
    const user = getUser(socket.id)

    io.to(user.room).emit("message", formatMessage(user.name, msg))
  })
  socket.on("disconnect", () => {
    console.log("User disconnected")
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Owner", `${user.name} has left.`)
      )
      io.to(user.room).emit("onlineUsers", {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
