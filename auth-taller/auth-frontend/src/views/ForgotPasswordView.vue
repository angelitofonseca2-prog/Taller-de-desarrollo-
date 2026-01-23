<!--
  Archivo: src/views/ForgotPasswordView.vue
  Propósito: Permite al usuario solicitar la recuperación de su contraseña
-->
<template>
  <div class="forgot-container">
    <div class="forgot-card">
      <h1>Recuperar Contraseña</h1>
      
      <p class="description" v-if="!submitted">
        Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
      </p>

      <!-- Mensaje de éxito -->
      <div v-if="submitted" class="success-message">
        <p>✅ Si el email <strong>{{ email }}</strong> existe en nuestro sistema, recibirás instrucciones en unos minutos.</p>
        <router-link to="/login" class="btn-back">Volver al Login</router-link>
      </div>

      <!-- Formulario -->
      <form v-else @submit.prevent="handleSubmit">
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

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="isLoading" class="btn-primary">
          {{ isLoading ? 'Enviando...' : 'Enviar Instrucciones' }}
        </button>

        <p class="back-link">
          <router-link to="/login">Volver al inicio de sesión</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  errorMessage.value = ''
  
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Por favor, ingresa un correo electrónico válido'
    return
  }

  isLoading.value = true

  // Simulamos una llamada al backend
  setTimeout(() => {
    isLoading.value = false
    submitted.value = true
  }, 1500)
}
</script>

<style scoped>
.forgot-container {
  min-height: calc(100vh - 80px); /* Ajuste por la navbar */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  padding: 20px;
}

.forgot-card {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  color: var(--text-primary);
}

h1 {
  margin-bottom: 16px;
  text-align: center;
  color: var(--text-primary);
  font-size: 24px;
}

.description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.5;
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

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  line-height: 1.6;
}

.btn-back {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #2e7d32;
  color: white;
  text-decoration: none;
  border-radius: 4px;
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

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>
