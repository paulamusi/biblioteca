<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLibros } from "~/composables/useLibros";
import { useGenero } from "~/composables/useGeneros";
import type { Libro, Genero } from "~/types/types";

const { agregarLibro } = useLibros();
const { obtenerGeneros } = useGenero();

const generosItems = ref<{ id: number; label: string }[]>([]);
const titulo = ref("");
const autor = ref("");
const region = ref("");
const pais = ref("");
const generosSeleccionados = ref<number[]>([]);
const recomendado = ref(false);

const errorTitulo = ref(false);
const errorAutor = ref(false);
const errorGenero = ref(false);

onMounted(async () => {
  try {
    const generos = await obtenerGeneros();
    generosItems.value = generos.map((g) => ({
      id: g.id,
      label: g.genero ?? "Desconocido",
    }));
  } catch (error) {
    console.error("Error al obtener los géneros:", error);
  }
});

const registrarLibro = async () => {
  errorTitulo.value = false;
  errorAutor.value = false;
  errorGenero.value = false;

  if (!titulo.value.trim()) errorTitulo.value = true;
  if (!autor.value.trim()) errorAutor.value = true;
  if (generosSeleccionados.value.length === 0) errorGenero.value = true;

  if (errorTitulo.value || errorAutor.value || errorGenero.value) {
    return;
  }

  try {
    const nuevoLibro: Libro = {
      titulo: titulo.value,
      autor: autor.value,
      region: region.value || null,
      pais: pais.value || null,
      subgenero: "Por definir",
      disponible: true,
      recomendado: recomendado.value,
    };
    console.log("check", recomendado.value);
    await agregarLibro(nuevoLibro, generosSeleccionados.value);

    resetearFormulario();

    alert("Libro registrado correctamente");
  } catch (error) {
    alert("Error al registrar el libro: " + (error as Error).message);
  }
};
const resetearFormulario = () => {
  titulo.value = "";
  autor.value = "";
  region.value = "";
  pais.value = "";
  generosSeleccionados.value = [];
  recomendado.value = false;
};
</script>

<template>
  <div class="w-full max-w-lg mx-auto p-4 border rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Registrar Libro</h2>

    <form>
      <div class="mb-4">
        <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
        <input
          v-model="titulo"
          type="text"
          id="titulo"
          :class="[
            'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
            errorTitulo ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-primary'
          ]"
          placeholder="Título del libro"
        />
        <p v-if="errorTitulo" class="text-red-500 text-xs mt-1">El título es obligatorio.</p>
      </div>

      <div class="mb-4">
        <label for="autor" class="block text-sm font-medium text-gray-700">Autor</label>
        <input
          v-model="autor"
          type="text"
          id="autor"
          :class="[
            'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
            errorAutor ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-primary'
          ]"
          placeholder="Autor del libro"
        />
        <p v-if="errorAutor" class="text-red-500 text-xs mt-1">El autor es obligatorio.</p>
      </div>

      <div class="mb-4">
        <GlobalDropdownCheckbox
          label="Géneros.."
          v-model="generosSeleccionados"
          :items="generosItems"
          class="text-gray-400"
        />
        <p v-if="errorGenero" class="text-red-500 text-xs mt-1">Debes seleccionar al menos un género.</p>
      </div>

      <div class="mb-4">
        <label for="region" class="block text-sm font-medium text-gray-700">Región</label>
        <input
          v-model="region"
          type="text"
          id="region"
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Región del autor"
        />
      </div>

      <div class="mb-4">
        <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
        <input
          v-model="pais"
          type="text"
          id="pais"
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="País del autor"
        />
      </div>
      <div class="mb-4 flex gap-3">
        <input 
            v-model="recomendado"
            type="checkbox"
            id="recomendado"
            class="w-4 h-4 text-primary rounded border-gray-300 "/>
        <label for="recomendado"  class="block text-sm font-medium text-gray-700">Recomendado</label>
      </div>
      <button
        type="button"
        class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
        @click="registrarLibro"
      >
        Registrar Libro
      </button>
    </form>
  </div>
</template>
