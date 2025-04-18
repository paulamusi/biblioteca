<script setup lang="ts">
import { useRoute } from "vue-router";
import { useLibros } from "~/composables/useLibros";
import type { Libro } from "~/types/types";

const route = useRoute();
const { obtenerLibroPorId } = useLibros();

const { data: libro, error } = await useAsyncData<Libro | null>(() => {
  const id = Number(route.params.id);
  return obtenerLibroPorId(id);
});
if (error.value) {
  console.error("Error al obtener el libro:", error.value);
}
</script>

<template>
    <div v-if="libro" class="container flex flex-wrap items-end gap-10 mx-auto py-6 border-b-2">  
      <!-- <div v-if="libro.imagen">
        <img :src="libro.imagen" alt="Portada del libro" class="w-64 h-auto mt-4" />
      </div> -->
      <div class="w-64 h-96 bg-gray-300 flex items-center justify-center mt-4">
        <span class="text-gray-500">Sin imagen</span>
      </div>
      <div>
        <h1 class="text-3xl font-bold">{{ libro.titulo }}</h1>
        <p class="text-xl text-gray-600 mt-2">{{ libro.autor }}</p>
        <p class="text-xl text-gray-600 mt-2">{{ libro.disponible ? 'Disponible' : 'No disponible' }}</p>
      </div>
    </div>
    <p class="container mx-auto py-6 text-xl font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, blanditiis saepe? 
        Nam laboriosam facere sint, cum libero dolores omnis eius dignissimos minus consectetur aliquid, magnam eaque 
        voluptas illo incidunt reprehenderit.</p>

  </template>