import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * REGISTRO DE USUARIO
   */
  async register(registerDto: RegisterDto) {
    const { nombre, email, password } = registerDto;

    // 1. Verificar si el email ya está registrado
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear el usuario
    const user = await this.usersService.create({
      nombre,
      email,
      password: hashedPassword,
    });

    // 4. Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword,
    };
  }

  /**
   * LOGIN DE USUARIO
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Buscar usuario por email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 3. Crear payload del token
    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
    };

    // 4. Generar token JWT
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login exitoso',
      access_token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
    };
  }

  /**
   * OBTENER PERFIL
   */
  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
