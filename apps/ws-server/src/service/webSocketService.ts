import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { WebSocket } from 'ws';

interface UserType {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

export class WebSocketHandler {
  private users: UserType[] = [];

  checkUser(token: string): string | null {
    try {
      const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return payload.userId;
    } catch (e) {
      return null;
    }
  }

  addUser(ws: WebSocket, userId: string) {
    this.users.push({ userId, ws, rooms: [] });
  }

  handleJoin(ws: WebSocket, roomId: string) {
    const user = this.users.find(user => user.ws === ws);
    if (user) {
      user.rooms.push(roomId);
      this.sendMessage(ws, { message: 'Joined Room!' });
    }
  }

  handleLeave(ws: WebSocket, roomId: string) {
    const user = this.users.find(user => user.ws === ws);
    if (user) {
      user.rooms = user.rooms.filter(id => id !== roomId);
      this.sendMessage(ws, { message: 'Left Room!' });
    }
  }

  async handleChat(ws: WebSocket, roomId: string, message: string, userId: string) {
    this.users.forEach(user => {
      if (user.rooms.includes(roomId) && user.ws !== ws) {
        this.sendMessage(user.ws, { type: 'CHAT', message, roomId });
      }
    });

    try {
      await prismaClient.chat.create({
        data: { message, roomId: Number(roomId), userId }
      });
    } catch (e) {
      console.error('Error saving chat:', e);
    }
  }

  handleDelete(ws: WebSocket, roomId: string) {
    this.users.forEach(user => {
      if (user.rooms.includes(roomId) && user.ws !== ws) {
        this.sendMessage(user.ws, { type: 'DELETE' });
      }
    });
  }

  private sendMessage(ws: WebSocket, data: object) {
    ws.send(JSON.stringify(data));
  }
}