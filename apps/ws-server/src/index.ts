import { WebSocket, WebSocketServer } from 'ws';
import { WebSocketHandler } from './service/webSocketService';
import { extractToken, verifyToken } from './service/authService';
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const wss = new WebSocketServer({ port:  Number(PORT)});
const handler = new WebSocketHandler();

wss.on('connection', (ws: WebSocket, req ) => {
  const url = req.url;
  if (!url) return;

  const authHeader = req.headers['authorization'];
  const token = extractToken(authHeader, req.url);
  const userId = verifyToken(token);

  if (!userId) {
    ws.close();
    return;
  }

  handler.addUser(ws, userId);

  ws.on('message', async data => {
    const parsedData = JSON.parse(data as unknown as string);
    const { type, roomId, message } = parsedData;

    switch (type) {
      case 'JOIN':
        handler.handleJoin(ws, roomId);
        break;
      case 'LEAVE':
        handler.handleLeave(ws, roomId);
        break;
      case 'CHAT':
        await handler.handleChat(ws, roomId, message, userId);
        break;
      case 'DELETE':
        handler.handleDelete(ws, roomId);
        break;
    }
  });
});