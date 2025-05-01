<!-- src/components/PersonCard.vue -->

<template>
  <!-- Tarjeta que muestra información detallada de un personaje -->
  <div class="card">
    <!-- Nombre del personaje -->
    <h2>{{ person.name }}</h2>
    
    <!-- Detalles del personaje: altura, género y año de nacimiento -->
    <p><strong>Altura:</strong> {{ person.height }} cm</p>
    <p><strong>Género:</strong> {{ person.gender }}</p>
    <p><strong>Año de nacimiento:</strong> {{ person.birth_year }}</p>
  </div>
</template>

<script>
export default {
  // Recibe un objeto `person` como propiedad desde el componente padre
  props: {
    person: Object  // Aquí se define que se espera un objeto `person` como propiedad
  }
}
</script>

<style scoped>
/* Estilos para la tarjeta individual de personaje */
.card {
  border: 1px solid #ccc; /* Borde gris claro */
  padding: 1rem;           /* Espaciado interno */
  border-radius: 10px;     /* Bordes redondeados */
  background: white;       /* Fondo blanco */
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2); /* Sombra sutil para dar profundidad */
  text-align: left;        /* Alineación del texto a la izquierda */
}
</style>
