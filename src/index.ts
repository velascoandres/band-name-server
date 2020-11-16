import express from 'express'
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { setupSockets } from './sockets/sockets';
let cors = require('cors');

dotenv.config();

const app = express();
export const port = process.env.PORT;
// app.use(cors());

// sockets

export const server = http.createServer(app);
// export const io = require('socket.io')(server);

// path publico

const pathPublico = path.resolve('public');



app.use(express.static(pathPublico));


setupSockets(server, port);





