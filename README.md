# Auth Taller NestJS

Proyecto desarrollado con NestJS que implementa un sistema completo de autenticación de usuarios utilizando JWT (JSON Web Token). El sistema permite el registro de usuarios con validaciones, control de correos duplicados y almacenamiento seguro de contraseñas mediante bcrypt.

El proceso de login genera un token JWT que incluye información del usuario como identificador, email, nombre, fecha de emisión y fecha de expiración. Este token es utilizado para proteger rutas del sistema, validándose a través de Passport y JwtStrategy, e inyectándose la información del usuario autenticado en req.user.

Las rutas protegidas no permiten el acceso sin token o con tokens inválidos, retornando correctamente errores 401 Unauthorized. Con un token válido, el sistema permite acceder a recursos protegidos como el perfil del usuario y rutas de ejemplo.

Todos los endpoints fueron probados utilizando Postman, verificando escenarios de registro válido, errores de validación, login correcto e incorrecto, acceso autorizado y no autorizado a rutas protegidas. El token generado fue verificado externamente en jwt.io, comprobando el algoritmo HS256, el payload y la firma con la clave secreta del proyecto.

Este proyecto corresponde a un taller práctico enfocado en aplicar buenas prácticas de seguridad, autenticación moderna y organización modular en NestJS.
