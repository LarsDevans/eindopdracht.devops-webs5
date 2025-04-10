import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signInternalToken(): string {
    return this.jwtService.sign(
      {
        service: 'gateway',
        apiKey: process.env.INTERNAL_API_KEY,
        scope: 'internal',
      },
      {
        secret: process.env.INTERNAL_JWT_SECRET,
        expiresIn: '5m',
      },
    );
  }
}
