import express from "express"
import { Server } from "socket.io"
import http from "http"

import config from "./utils/common"

const {CLIENT_URL} = config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
})

import formatMessage from "./utils/messages"
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} from "./utils/users"

const PORT = process.env.PORT || 5000

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error || !user) return callback(error)

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

  socket.on("sendMessage", (msg: string, callback) => {
    const user = getUser(socket.id)

    if(!user) return callback({ error: 'Username and room are required.' })

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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)

)
