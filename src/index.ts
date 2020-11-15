import express from 'express'
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { setupSockets } from './sockets';


dotenv.config();

const app = express();
const port = process.env.PORT;

// sockets
const server = http.createServer(app);
setupSockets(server, port);

// path publico

const pathPublico = path.resolve('public');



app.use(express.static(pathPublico));



