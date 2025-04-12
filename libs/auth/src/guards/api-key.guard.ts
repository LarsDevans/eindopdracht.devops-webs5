import { IS_PUBLIC_KEY } from '@app/auth';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly jwtSecret: string,
    private readonly apiKey: string,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { apiKey: string };

      if (decoded.apiKey !== this.apiKey) {
        throw new UnauthorizedException('Invalid API Key');
      }

      return true;
    } catch (e) {
      console.error('Token verification failed:', e);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
