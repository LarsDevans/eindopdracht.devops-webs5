import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.API_JWT_SECRET_TARGET) as {
        apiKey: string;
      };

      if (decoded.apiKey !== process.env.API_KEY_TARGET) {
        throw new UnauthorizedException('Invalid API Key');
      }

      return true;
    } catch (e) {
      console.error('Token verification failed:', e);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
