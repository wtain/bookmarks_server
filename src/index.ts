import app from './server';
import config from '../config.json';
import { MongoClient } from 'mongodb';
import { DB_CONN_STRING } from './constants/storage';
import * as http from 'http';
import WebSocket from "ws";

const port = Number(process.env.PORT || config.PORT || 8080);

MongoClient.connect(process.env.DATABASE || DB_CONN_STRING, (err, db) => {
  if (err) {
    console.warn(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;

  // Start the application by listening to specific port
  const server = app.listen(port, () => {
    console.info('Express application started on port: ' + port);
  });

  console.info("Starting Websocket server");
  // const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    authenticate(request, function next(err, client) {
      if (err || !client) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
  
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, client);
      });
    });
  });

  wss.on('connection', (ws: WebSocket) => {

    ws.on('message', (message: string) => {

        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    setInterval(() => {
      ws.send("Keep alive message");
    }, 1000);

    ws.send('Hi there, I am a WebSocket server');
  });
  
});



function authenticate(request: http.IncomingMessage, arg1: (err: any, client: any) => void) {
  // throw new Error('Function not implemented.');
}

