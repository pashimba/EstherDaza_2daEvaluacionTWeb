// src/router.js

// Importa funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Importa la vista principal que será cargada en la ruta '/'
import PeopleList from './views/PeopleList.vue'

// Define las rutas de la aplicación
const routes = [
  {
    path: '/',                // Ruta principal
    name: 'Home',             // Nombre de la ruta
    component: PeopleList     // Componente que se mostrará
  }
]

// Crea la instancia del enrutador con historial HTML5
const router = createRouter({
  history: createWebHistory(), // Utiliza el historial del navegador
  routes                        // Asigna las rutas definidas
})

// Exporta el enrutador para usarlo en main.js
export default router
