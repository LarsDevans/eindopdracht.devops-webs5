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
