import * as jwt from 'jsonwebtoken';

export function generateOpaqueToken(service: string): string {
  const keyEnv = `API_KEY_${service.toUpperCase()}`;
  const secretEnv = `API_JWT_SECRET_${service.toUpperCase()}`;

  const apiKey = process.env[keyEnv];
  const jwtSecret = process.env[secretEnv];

  if (!apiKey || !jwtSecret) {
    throw new Error(
      `Missing environment variable(s): ${!apiKey ? keyEnv : ''} ${!jwtSecret ? secretEnv : ''}`,
    );
  }

  const payload = { apiKey };

  return jwt.sign(payload, jwtSecret, {
    expiresIn: '5m',
    subject: 'gateway-auth',
  });
}
