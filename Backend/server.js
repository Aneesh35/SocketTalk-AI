import 'dotenv/config'
import app from "./app.js";
import http from 'http';
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken';
const port = process.env.port || 3000;
import { DataBase_connect } from './db/connection.js';
import mongoose from 'mongoose';
import { generateResult } from './services/ai.service.js';
import project from './models/project.model.js';
import user from './models/user.model.js';

DataBase_connect();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization.split(' ')[1];
    const projectId = socket.handshake.query.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error('Invalid ProjectId'));
    }
    socket.project = await project.findById(projectId);

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return next(new Error('Authentication error'));
    }

    socket.user = decoded;

    next();
  }
  catch (error) {
    next(error);
  }
})


io.on('connection', socket => {
  socket.roomId = socket.project._id.toString();
  console.log('a user connected');

  socket.join(socket.roomId);

  socket.on('project-message', async (data) => {

    try {

      const message = data.message;
      const aiIsPresentInMessage = message.includes('@ai');
      const sentBy = await user.findById(data.sender);
      data.sender = sentBy.email;
      socket.broadcast.to(socket.roomId).emit('project-message', data);

      if (aiIsPresentInMessage) {
        const prompt = message.replace('ai', '');
        const response = await generateResult(prompt);
        io.to(socket.roomId).emit('project-message', {
          sender: 'AI',
          message: response,
        })
        return;
      }
    }
    catch (error) {
      console.log(error)
    }
  })

  socket.on('event', data => { /* … */ });

  socket.on('disconnect', () => {
    console.log("user disconnected");
    socket.leave(socket.roomId)
  });
});

server.listen(port, () => {
  console.log(`Server has started at http://localhost:${port} \n`);
})
