<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useGenero } from "~/composables/useGeneros";
import { useLibros } from "~/composables/useLibros";
import type { Libro, Genero } from "~/types/types";

const {
  obtenerLibrosRecomendados,
  obtenerLibrosPorGenero,
  busquedaLibro,
  resultados,
  buscarLibros,
  seleccionarLibro,
} = useLibros();

const { obtenerGeneros } = useGenero();

const librosRecomendados = ref<Libro[]>([]);
const librosFiltradosPorGenero = ref<Libro[] | null>(null);
const generoSeleccionado = ref<string | null>(null); 

const tituloCatalogo = computed(() => {
  if (busquedaLibro.value.trim()) {
    return "Resultados de la búsqueda";
  }
  if (generoSeleccionado.value) {
    return generoSeleccionado.value;
  }
  return "Recomendados";
});

onMounted(async () => {
  const res = await obtenerLibrosRecomendados();
  librosRecomendados.value = res ?? [];
});

const { data: generos, error: errorGeneros } = await useAsyncData<Genero[]>("genero", obtenerGeneros);
if (errorGeneros.value) {
  console.error("Error al obtener los géneros:", errorGeneros.value);
}

const generoItems = computed(() => generos.value?.map((g) => g.genero) ?? []);

const seleccionarGenero = async (genero: string) => {
  generoSeleccionado.value = genero;
  const generoEncontrado = generos.value?.find((g) => g.genero === genero);
  if (!generoEncontrado) return;
  
  const libros = await obtenerLibrosPorGenero(generoEncontrado.id!);
  librosFiltradosPorGenero.value = libros ?? [];
};

const librosParaMostrar = computed(() => {
  if (busquedaLibro.value.trim()) {
    return resultados.value;
  }
  if (librosFiltradosPorGenero.value) {    
    return librosFiltradosPorGenero.value;
  }
  return librosRecomendados.value;
});
</script>
<template>
  <div class="flex flex-wrap justify-center items-center bg-primary w-full py-8 gap-12">
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
    <GlobalDropdown 
      buttonText="Categoría:.." 
      :items="generoItems" 
      @item-click="seleccionarGenero"
    />
    <GlobalDropdown 
      buttonText="Ordenar por:.." 
      :items="['Opción 1', 'Opción 2', 'Opción 3']" 
    />
  </div>
  <h2 class="text-2xl font-bold mt-8 w-full px-10">
    {{ tituloCatalogo }}
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 mt-6 justify-items-center">
    <CatalogoCard 
      v-for="libro in librosParaMostrar"
      :key="libro.id" 
      :id="libro.id"
      :autor="libro.autor ?? ''"  
      :titulo="libro.titulo ?? ''"
      :disponible="libro.disponible"
    />
  </div>
</template>