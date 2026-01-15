import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  /**
   * Correo electrónico del usuario
   * Se usa como credencial de autenticación
   */
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  /**
   * Contraseña del usuario
   */
  @IsString({ message: 'La contraseña es obligatoria' })
  password: string;
}
