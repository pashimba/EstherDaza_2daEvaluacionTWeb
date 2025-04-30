<!-- src/components/PersonCard.vue -->

<template>
  <!-- Tarjeta que muestra información detallada de un personaje -->
  <div class="card">
    <h2>{{ person.name }}</h2>
    <p><strong>Altura:</strong> {{ person.height }} cm</p>
    <p><strong>Género:</strong> {{ person.gender }}</p>
    <p><strong>Año de nacimiento:</strong> {{ person.birth_year }}</p>
  </div>
</template>

<script>
export default {
  // Recibe un objeto `person` como propiedad desde el componente padre
  props: {
    person: Object
  }
}
</script>

<style scoped>
/* Estilos para la tarjeta individual de personaje */
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background: white;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  text-align: left;
}
</style>
