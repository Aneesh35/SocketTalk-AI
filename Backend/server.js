import 'dotenv/config'
import app from "./app.js";
import http from 'http';
const port = process.env.port || 3000;
import { DataBase_connect } from './db/connection.js';

DataBase_connect();

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server has started at http://localhost:${port} \n`);
})