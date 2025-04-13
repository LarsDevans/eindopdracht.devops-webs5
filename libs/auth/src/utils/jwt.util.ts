import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export function generateOpaqueToken(service: string): string {
  const keyEnv = `API_KEY_${service.toUpperCase()}`;
  const secretEnv = `API_JWT_SECRET_${service.toUpperCase()}`;
  const expiresInEnv = `API_JWT_EXPIRATION_TIME`;

  const apiKey = process.env[keyEnv];
  const jwtSecret = process.env[secretEnv];
  const expiresIn = process.env[expiresInEnv];

  if (!apiKey || !jwtSecret || !expiresIn) {
    throw new Error(
      `Missing environment variable(s): ${!apiKey ? keyEnv : ''} ${!jwtSecret ? secretEnv : ''} ${!expiresIn ? expiresInEnv : ''}`,
    );
  }

  const payload = { apiKey };

  return jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn,
    subject: 'gateway-auth',
  });
}

export function getUuidFromToken(req: Request): string | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new UnauthorizedException('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  const decoded = jwt.decode(token) as { sub?: string };
  const userUuid = decoded?.sub;
  if (!userUuid) {
    throw new UnauthorizedException('Invalid token: missing subject (user id)');
  }
  return userUuid;
}
