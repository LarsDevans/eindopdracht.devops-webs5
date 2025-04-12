import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email is already in use' })
  async register(@Body() registerDto: UserDto) {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiBody({ type: UserDto })
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: UserDto) {
    return await this.authService.login(loginDto);
  }
}
