<!--
  Archivo: src/views/LoginView.vue
  Propósito: Página de inicio de sesión para usuarios existentes
  
  Funcionalidad:
  - Formulario con email y password
  - Validación básica de campos
  - Envío de credenciales al backend
  - Manejo de errores de autenticación
  - Redirección a perfil si el login es exitoso
-->
<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Título de la página -->
      <h1>Iniciar Sesión</h1>
      
      <!-- Mensaje de error (solo se muestra si hay un error) -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Formulario de login -->
      <!-- @submit.prevent evita el comportamiento por defecto del formulario -->
      <form @submit.prevent="handleLogin">
        
        <!-- Campo de email -->
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="correo@ejemplo.com"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Campo de contraseña -->
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Tu contraseña"
            required
            :disabled="isLoading"
          />
        </div>

        <!-- Checkbox Recordarme -->
        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberEmail" :disabled="isLoading" />
            <span>Recordarme</span>
          </label>
        </div>

        <!-- Botón de submit -->
        <button type="submit" :disabled="isLoading" class="btn-primary">
          <!-- Mostrar texto diferente según el estado de carga -->
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <!-- Link para recuperar contraseña -->
      <p class="forgot-link">
        <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
      </p>

      <!-- Link para ir a registro -->
      <p class="register-link">
        ¿No tienes cuenta? 
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * Lógica del componente LoginView
 * Usamos Composition API con <script setup>
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

// Obtener el router para navegación programática
const router = useRouter()

// Variables reactivas para el formulario
// ref() crea variables que Vue puede observar y actualizar automáticamente
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const rememberEmail = ref(false)

// Al montar el componente, verificar si hay un email guardado
onMounted(() => {
  const savedEmail = localStorage.getItem('remember_email')
  if (savedEmail) {
    email.value = savedEmail
    rememberEmail.value = true
  }
})

/**
 * Manejar el envío del formulario de login
 * Esta función se ejecuta cuando el usuario hace clic en "Iniciar Sesión"
 */
const handleLogin = async () => {
  // Limpiar mensaje de error anterior
  errorMessage.value = ''
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Por favor, ingresa un correo electrónico válido'
    isLoading.value = false
    return
  }

  try {
    // Intentar hacer login con las credenciales
    await authService.login({
      email: email.value,
      password: password.value
    })

    // Si llegamos aquí, el login fue exitoso
    
    // Guardar o eliminar el email según la preferencia del usuario
    if (rememberEmail.value) {
      localStorage.setItem('remember_email', email.value)
    } else {
      localStorage.removeItem('remember_email')
    }

    // Redirigir al perfil del usuario
    router.push('/profile')
    
  } catch (error) {
    // Si hay un error, mostrarlo al usuario
    // error.message viene del backend o del servicio
    errorMessage.value = error.message || 'Error al iniciar sesión'
  } finally {
    // Desactivar estado de carga (siempre se ejecuta)
    isLoading.value = false
  }
}
</script>

<style scoped>
/**
 * Estilos específicos para la vista de Login
 * El atributo 'scoped' asegura que estos estilos solo afecten este componente
 */

.login-container {
  /* Centrar verticalmente */
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  padding: 20px;
}

.login-card {
  /* Tarjeta blanca centrada */
  background: var(--card-bg);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  color: var(--text-primary);
}

h1 {
  /* Título */
  margin-bottom: 24px;
  text-align: center;
  color: var(--text-primary);
  font-size: 24px;
}

.form-group {
  /* Grupo de campo (label + input) */
  margin-bottom: 20px;
}

.form-options {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-weight: normal;
  color: var(--text-secondary);
}

.checkbox-container input {
  width: auto;
  cursor: pointer;
}

label {
  /* Etiquetas de campos */
  display: block;
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

input {
  /* Campos de entrada */
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  background-color: var(--card-bg);
  color: var(--text-primary);
}

input:focus {
  /* Efecto al hacer foco en el campo */
  outline: none;
  border-color: var(--primary-color);
}

input:disabled {
  /* Estilo cuando el campo está deshabilitado */
  background-color: var(--bg-color);
  cursor: not-allowed;
}

.btn-primary {
  /* Botón principal */
  width: 100%;
  padding: 14px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  /* Mensaje de error */
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.register-link, .forgot-link {
  /* Link a registro y recuperación */
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 14px;
}

.forgot-link {
  margin-top: 15px;
}

.register-link a, .forgot-link a {
  color: var(--primary-color);
  text-decoration: none;
}

.register-link a:hover, .forgot-link a:hover {
  text-decoration: underline;
}
</style>