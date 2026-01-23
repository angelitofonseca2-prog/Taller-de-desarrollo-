# Frontend Vue.js – Autenticación con JWT

Aplicación frontend desarrollada con Vue 3 y Vite como parte del taller **Frontend con Vue.js – Login y Registro de Usuarios**.

El proyecto consume un backend NestJS con autenticación JWT y demuestra el flujo completo de login, registro, protección de rutas y manejo de sesión en el frontend.

---

## Tecnologías

- Vue 3
- Vite
- Vue Router
- Axios
- JWT
- LocalStorage
- Backend NestJS (API REST)

---

## Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Almacenamiento del token JWT
- Protección de rutas con guards
- Visualización de perfil del usuario
- Persistencia de sesión al recargar
- Cierre de sesión

### Funcionalidades opcionales
- Recuperación de contraseña (flujo visual)
- Opción “Recordarme”
- Tema oscuro / alto contraste

---

## Flujo General

1. El usuario se registra o inicia sesión.
2. El backend devuelve un access_token.
3. El token se guarda en localStorage.
4. Las peticiones protegidas envían el token en el header Authorization.
5. El usuario accede a su perfil.
6. Al cerrar sesión, el token se elimina.
