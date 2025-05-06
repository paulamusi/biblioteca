<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4 text-primary">Bienvenido/a al Panel de Administración</h1>
    <p class="text-gray-700">Selecciona una opción del menú lateral para comenzar.</p>
  </div>
</template>