import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  /* Método que se ejecuta antes de acceder a una ruta protegida */
  canActivate(context: ExecutionContext) {
    // Llama a la lógica base de Passport
    return super.canActivate(context);
  }

  /* Maneja el resultado de la autenticación */
  handleRequest(err: any, user: any, info: any) {
    // Si hay error o no existe el usuario autenticado
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido o expirado');
    }
    // Si todo está correcto, retorna el usuario
    // Este valor estará disponible en req.user
    return user;
  }
}
