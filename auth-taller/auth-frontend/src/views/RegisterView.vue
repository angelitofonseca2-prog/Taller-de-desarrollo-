<!--
  Archivo: src/views/RegisterView.vue
  Propósito: Página de registro para nuevos usuarios
  
  Funcionalidad:
  - Formulario con nombre, email y password
  - Confirmación de contraseña
  - Validación de que las contraseñas coincidan
  - Envío de datos al backend para crear cuenta
  - Redirección a login después de registro exitoso
-->
<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Crear Cuenta</h1>
      
      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleRegister">
        
        <!-- Campo de nombre -->
        <div class="form-group">
          <label for="name">Nombre Completo</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Tu nombre"
            required
            :disabled="isLoading"
          />
        </div>

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
            placeholder="Mínimo 6 caracteres"
            required
            minlength="6"
            :disabled="isLoading"
          />
          <!-- Indicador de fortaleza de contraseña -->
          <div v-if="password" class="strength-meter">
            <div :class="['strength-bar', passwordStrength.class]"></div>
            <span class="strength-text">{{ passwordStrength.label }}</span>
          </div>
          <ul v-if="password" class="password-requirements">
            <li :class="{ met: hasLength }">Mínimo 6 caracteres</li>
            <li :class="{ met: hasUpper }">Al menos una mayúscula</li>
            <li :class="{ met: hasNumber }">Al menos un número</li>
            <li :class="{ met: hasSpecial }">Al menos un carácter especial</li>
          </ul>
        </div>

        <!-- Campo de confirmar contraseña -->
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            required
            :disabled="isLoading"
          />
          <!-- Mensaje de validación de contraseñas -->
          <span v-if="confirmPassword && password !== confirmPassword" class="validation-error">
            Las contraseñas no coinciden
          </span>
        </div>

        <!-- Botón de submit -->
        <button 
          type="submit" 
          :disabled="isLoading || (confirmPassword && password !== confirmPassword)"
          class="btn-primary"
        >
          {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
        </button>
      </form>

      <!-- Link para ir a login -->
      <p class="login-link">
        ¿Ya tienes cuenta? 
        <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()

// Variables reactivas del formulario
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

// Lógica de fortaleza de contraseña
const hasLength = computed(() => password.value.length >= 6)
const hasUpper = computed(() => /[A-Z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))
const hasSpecial = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value))

const passwordStrength = computed(() => {
  let score = 0
  if (hasLength.value) score++
  if (hasUpper.value) score++
  if (hasNumber.value) score++
  if (hasSpecial.value) score++

  if (!password.value) return { class: '', label: '' }
  if (score <= 1) return { class: 'weak', label: 'Débil' }
  if (score === 2) return { class: 'medium', label: 'Media' }
  if (score === 3) return { class: 'strong', label: 'Fuerte' }
  return { class: 'very-strong', label: 'Muy Fuerte' }
})

/**
 * Manejar el registro de nuevo usuario
 */
const handleRegister = async () => {
  // Validar que las contraseñas coincidan
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden'
    return
  }

  errorMessage.value = ''
  successMessage.value = ''

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Por favor, ingresa un correo electrónico válido'
    return
  }

  // Validar requisitos de contraseña
  if (!hasUpper.value || !hasNumber.value) {
    errorMessage.value = 'La contraseña debe tener al menos una mayúscula y un número'
    return
  }

  isLoading.value = true

  try {
    // Intentar registrar al usuario
    await authService.register({
      nombre: name.value,
      email: email.value,
      password: password.value
    })

    // Registro exitoso
    successMessage.value = '¡Cuenta creada exitosamente! Redirigiendo al login...'
    
    // Esperar 2 segundos y redirigir al login
    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (error) {
    errorMessage.value = error.message || 'Error al crear la cuenta'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Los estilos son similares al login, con algunas adiciones */

.register-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  padding: 20px;
}

.register-card {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  color: var(--text-primary);
}

h1 {
  margin-bottom: 24px;
  text-align: center;
  color: var(--text-primary);
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: var(--card-bg);
  color: var(--text-primary);
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

input:disabled {
  background-color: var(--bg-color);
  cursor: not-allowed;
}

.btn-primary {
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
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.validation-error {
  color: #c62828;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
  font-size: 14px;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Estilos para el medidor de fortaleza */
.strength-meter {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  margin-bottom: 4px;
  transition: all 0.3s;
}

.strength-bar.weak { width: 25%; background-color: #ff5252; }
.strength-bar.medium { width: 50%; background-color: #ffc107; }
.strength-bar.strong { width: 75%; background-color: #8bc34a; }
.strength-bar.very-strong { width: 100%; background-color: #4caf50; }

.strength-text {
  font-size: 12px;
  color: var(--text-secondary);
}

.password-requirements {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--text-secondary);
}

.password-requirements li::before {
  content: "○ ";
}

.password-requirements li.met {
  color: #4caf50;
}

.password-requirements li.met::before {
  content: "● ";
}
</style>