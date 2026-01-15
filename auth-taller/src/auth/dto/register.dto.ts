import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  /**
   * Nombre completo del usuario
   */
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede superar 50 caracteres' })
  nombre: string;

  /**
   * Correo electrónico del usuario
   * Se usa como credencial de autenticación
   */
  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email: string;

  /**
   * Contraseña del usuario
   * Se validará antes de ser hasheada
   */
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(20, { message: 'La contraseña no puede superar 20 caracteres' })
  password: string;
}
