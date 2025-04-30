// src/main.js

// Importa la función principal para crear la aplicación Vue
import { createApp } from 'vue'

// Importa el componente raíz de la aplicación
import App from './App.vue'

// Importa la configuración de rutas (Vue Router)
import router from './router'

// Crea la aplicación, le añade el enrutador y la monta en el div con id "app"
createApp(App).use(router).mount('#app')
