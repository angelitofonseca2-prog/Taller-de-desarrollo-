import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* POST /auth/register
   * Registro de nuevo usuario
   * Ruta PÚBLICA
   */
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /*POST /auth/login
   * Inicio de sesión
   * Ruta PÚBLICA
   */
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /* GET /auth/profile
   * Obtener perfil del usuario autenticado
   * Ruta PROTEGIDA
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'Perfil obtenido exitosamente',
      user: req.user, // viene de JwtStrategy.validate()
    };
  }

  /* GET /auth/protected
   * Ruta de ejemplo protegida
   */
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedRoute(@Request() req) {
    return {
      message: `¡Hola ${req.user.nombre}! Esta es una ruta protegida.`,
      timestamp: new Date().toISOString(),
      userId: req.user.userId,
    };
  }
}
