<script setup lang="ts">
import { useLibros } from "~/composables/useLibros";
import type { Libro } from "~/types/types";

const { obtenerLibros, busquedaLibro, resultados, buscarLibros, seleccionarLibro } = useLibros();

const { data: libros, error } = await useAsyncData<Libro[]>("libros", obtenerLibros,);
if (error.value) {
  console.error("Error al obtener los libros:", error.value);
}


</script>
<template>
    <div class=" flex flex-wrap justify-center items-center bg-primary w-full py-8 gap-12">
      <GlobalInputBusqueda
        v-model:modelValue="busquedaLibro"
        :showLabel="false"
        placeholder="Escribe el título del libro.."
        :searchFunction="buscarLibros"
        :onSelect="seleccionarLibro"
        :customTextColor="'text-white'"
        :customPlaceholderClass="'placeholder-white'"
        :iconColorClass="'text-white'"
        :items="resultados"
      />
        <CatalogoDropdown 
          buttonText="Categoría:.." 
          :items="['Opción 1', 'Opción 2', 'Opción 3']" />
        <CatalogoDropdown 
          buttonText="Ordenar por:.." 
          :items="['Opción 1', 'Opción 2', 'Opción 3']" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-6 justify-items-center">
      <CatalogoCard 
         v-for="libro in busquedaLibro.trim() ? resultados : libros"
        :key="libro.id" 
        :id="libro.id"
        :autor="libro.autor ?? ''"  
        :titulo="libro.titulo ?? ''"
      />
  </div>
</template>