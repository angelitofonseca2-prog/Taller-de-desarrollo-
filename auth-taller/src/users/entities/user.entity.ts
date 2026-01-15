/*Entidad User: Representa a un usuario del sistema
 Se utiliza principalmente para autenticación con JWT */
export class User {
  /*Identificador único del usuario. Simula una clave primaria autoincremental*/
  id: number;

  /*Nombre completo del usuario. Ejemplo: "Juan Pérez"*/
  nombre: string;

  /*El correo electrónico del usuario debe ser único.*/
  email: string;

  /*Contraseña del usuario. Se almacena hasheada usando bcrypt
   */
  password: string;

  /*Fecha y hora de creación del usuario. Se asigna automáticamente al momento 
  del registro*/
  createdAt: Date;
}
