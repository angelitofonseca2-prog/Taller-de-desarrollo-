<!--
  Archivo: src/App.vue
  Propósito: Componente raíz de la aplicación
  
  <router-view> es donde Vue Router renderiza el componente
  correspondiente a la ruta actual
-->
<template>
  <div id="app">
    <!-- Barra de navegación simple -->
    <nav class="navbar">
      <router-link to="/" class="brand">🏠 Mi App</router-link>
      
      <div class="nav-links">
        <router-link to="/">Inicio</router-link>
        
        <!-- Mostrar según estado de autenticación -->
        <template v-if="!isAuthenticated">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Registro</router-link>
        </template>
        
        <template v-else>
          <router-link to="/profile">Perfil</router-link>
          <a href="#" @click.prevent="logout">Salir</a>
        </template>
        
        <!-- Botón de Modo Oscuro -->
        <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Modo Claro' : 'Modo Oscuro'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <!-- Aquí se renderizan las vistas según la ruta -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from './services/authService'

const router = useRouter()

const isAuthenticated = computed(() => authService.isAuthenticated())

const isDark = ref(false)

onMounted(() => {
  // Cargar preferencia del localStorage o del sistema
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark-theme')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark-theme')
    localStorage.setItem('theme', 'light')
  }
}

const logout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<style>
:root {
  --bg-color: #f5f5f5;
  --card-bg: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --navbar-bg: #ffffff;
  --border-color: #dddddd;
  --primary-color: #4CAF50;
}

:root.dark-theme {
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --text-primary: #e0e0e0;
  --text-secondary: #aaaaaa;
  --navbar-bg: #1e1e1e;
  --border-color: #333333;
  --primary-color: #81c784;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  min-height: 100vh;
}

/* Navbar */
.navbar {
  background: var(--navbar-bg);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.brand {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--text-primary);
}

.theme-toggle {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
  color: var(--text-primary);
}

.theme-toggle:hover {
  background-color: var(--border-color);
}

.nav-links a.router-link-active {
  color: #667eea;
  font-weight: 500;
}

</style>
