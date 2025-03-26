import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export function extractToken(authHeader: string | undefined, url?: string): string {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]!; 
  }

  if (url) {
    const queryParams = new URLSearchParams(url.split('?')[1]);
    return queryParams.get('token') || ''; 
  }

  return '';
}

export function verifyToken(token: string): string | null {
  try {
    const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return payload.userId || null;
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}
