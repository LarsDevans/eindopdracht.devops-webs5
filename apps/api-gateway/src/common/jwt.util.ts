import * as jwt from 'jsonwebtoken';

export function generateOpaqueToken(service: string): string {
  const payload = {
    apiKey: process.env[`API_KEY_${service.toUpperCase()}`],
  };

  return jwt.sign(
    payload,
    process.env[`API_JWT_SECRET_${service.toUpperCase()}`],
    {
      expiresIn: '5m',
      subject: 'gateway-auth',
    },
  );
}
