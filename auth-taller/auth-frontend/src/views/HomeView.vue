<!--
  Archivo: src/views/HomeView.vue
  Propósito: Página de inicio pública
  
  Esta página es accesible para todos los usuarios (autenticados o no).
  Muestra opciones de navegación según el estado de autenticación.
-->
<template>
  <div class="home-container">
    <div class="home-card">
      <h1>🚀 Bienvenido</h1>
      <p class="subtitle">Sistema de Autenticación con Vue.js y NestJS</p>

      <div class="features">
        <div class="feature">
          <span class="icon">🔐</span>
          <span>Autenticación JWT</span>
        </div>
        <div class="feature">
          <span class="icon">🛡️</span>
          <span>Rutas Protegidas</span>
        </div>
        <div class="feature">
          <span class="icon">⚡</span>
          <span>Vue 3 + Vite</span>
        </div>
      </div>

      <!-- Botones según estado de autenticación -->
      <div class="actions">
        <!-- Si NO está autenticado -->
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-primary">
            Iniciar Sesión
          </router-link>
          <router-link to="/register" class="btn btn-secondary">
            Crear Cuenta
          </router-link>
        </template>
        
        <!-- Si ESTÁ autenticado -->
        <template v-else>
          <router-link to="/profile" class="btn btn-primary">
            Ver Mi Perfil
          </router-link>
          <button @click="handleLogout" class="btn btn-secondary">
            Cerrar Sesión
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()

// Propiedad computada para verificar autenticación
// Se actualiza automáticamente cuando cambia el estado
const isAuthenticated = computed(() => authService.isAuthenticated())

const handleLogout = () => {
  authService.logout()
  // Forzar recarga para actualizar el estado
  router.go(0)
}
</script>

<style scoped>
.home-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  padding: 20px;
}

.home-card {
  background: var(--card-bg);
  padding: 50px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
  color: var(--text-primary);
}

h1 {
  font-size: 36px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.subtitle {
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-size: 16px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--bg-color);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.icon {
  font-size: 18px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  display: block;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--bg-color);
}
</style>
