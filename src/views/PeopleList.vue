<!-- src/views/PeopleList.vue -->

<template>
  <div>
    <!-- Barra de navegación superior -->
    <Navbar />
    
    <!-- Buscador de personajes -->
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Buscar personaje..." 
        class="search-input"
      />
    </div>

    <!-- Título de la vista -->
    <h2 style="text-align:center;">Listado de Personajes</h2>

    <!-- Estado de carga o error -->
    <!-- Si los datos están siendo cargados, muestra el mensaje "Cargando personajes..." -->
    <div v-if="loading">Cargando personajes...</div>
    
    <!-- Si ocurrió un error al cargar los personajes, muestra el mensaje de error -->
    <div v-else-if="error">Ocurrió un error al obtener los datos.</div>
    
    <!-- Galería de tarjetas de personajes -->
    <!-- Se muestran las tarjetas de personajes filtradas por la búsqueda del usuario -->
    <div class="grid">
      <PersonCard 
        v-for="(person, index) in filteredPeople" 
        :key="index" 
        :person="person" 
      />
    </div>

    <!-- Controles de paginación -->
    <!-- Los botones permiten navegar entre las páginas de personajes -->
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
      // Lista de personajes obtenida de la API
      people: [],            
      // Variable para almacenar la consulta de búsqueda
      searchQuery: '',       
      // Indicador de carga
      loading: true,         
      // Indicador de error
      error: false,          
      // URL de la siguiente página (paginación)
      nextPage: null,        
      // URL de la página anterior (paginación)
      prevPage: null,        
      // URL actual que se está consultando
      currentUrl: 'https://swapi.py4e.com/api/people/' 
    }
  },
  computed: {
    // Computed property que filtra los personajes según la consulta de búsqueda
    filteredPeople() {
      // Filtra la lista de personajes en base a si el nombre contiene el texto de búsqueda
      return this.people.filter(person => 
        person.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    // Función para obtener personajes desde la API
    fetchPeople(url) {
      this.loading = true
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Actualiza la lista de personajes con los datos obtenidos
          this.people = data.results
          // Actualiza las URLs para la paginación
          this.nextPage = data.next
          this.prevPage = data.previous
          this.loading = false
        })
        .catch(error => {
          // Muestra un error si la solicitud falla
          console.error('Error al obtener los personajes:', error)
          this.error = true
          this.loading = false
        })
    },
    // Función para cambiar de página usando la URL provista
    goToPage(url) {
      if (url) {
        // Actualiza la URL actual y vuelve a realizar la solicitud para obtener los personajes
        this.currentUrl = url
        this.fetchPeople(url)
      }
    }
  },
  // Al montar el componente, se hace la primera solicitud para obtener los personajes
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

/* Estilos para el buscador */
.search-container {
  margin: 1rem;
  text-align: center;
}

.search-input {
  padding: 8px;
  font-size: 16px;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilos para los botones */
button {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e67e22;
}

button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
</style>
