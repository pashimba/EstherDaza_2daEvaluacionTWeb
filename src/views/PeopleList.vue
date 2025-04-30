<!-- src/views/PeopleList.vue -->

<template>
  <div>
    <!-- Barra de navegación superior -->
    <Navbar />
    
    <!-- Título de la vista -->
    <h2 style="text-align:center;">Listado de Personajes</h2>

    <!-- Estado de carga o error -->
    <div v-if="loading">Cargando personajes...</div>
    <div v-else-if="error">Ocurrió un error al obtener los datos.</div>
    
    <!-- Galería de tarjetas de personajes -->
    <div class="grid">
      <PersonCard 
        v-for="(person, index) in people" 
        :key="index" 
        :person="person" 
      />
    </div>

    <!-- Controles de paginación -->
    <div style="text-align:center; margin-top: 1rem;">
      <button @click="goToPage(prevPage)" :disabled="!prevPage">Anterior</button>
      <button @click="goToPage(nextPage)" :disabled="!nextPage">Siguiente</button>
    </div>

    <!-- Pie de página -->
    <Footer />
  </div>
</template>

<script>
// Importación de componentes reutilizables
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PersonCard from '../components/PersonCard.vue'

export default {
  components: { Navbar, Footer, PersonCard },
  data() {
    return {
      people: [],            // Lista de personajes obtenida de la API
      loading: true,         // Indicador de carga
      error: false,          // Indicador de error
      nextPage: null,        // URL de la siguiente página (paginación)
      prevPage: null,        // URL de la página anterior (paginación)
      currentUrl: 'https://swapi.py4e.com/api/people/' // URL actual que se está consultando
    }
  },
  methods: {
    // Función para obtener personajes desde la API
    fetchPeople(url) {
      this.loading = true
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.people = data.results
          this.nextPage = data.next
          this.prevPage = data.previous
          this.loading = false
        })
        .catch(error => {
          console.error('Error al obtener los personajes:', error)
          this.error = true
          this.loading = false
        })
    },
    // Función para cambiar de página usando la URL provista
    goToPage(url) {
      if (url) {
        this.currentUrl = url
        this.fetchPeople(url)
      }
    }
  },
  // Al montar el componente, se hace la primera solicitud
  mounted() {
    this.fetchPeople(this.currentUrl)
  }
}
</script>

<style scoped>
/* Estilos para la cuadrícula de tarjetas de personajes */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
