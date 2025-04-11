<script setup lang="ts">
import { useLibros } from "~/composables/useLibros";
import type { Libro } from "~/types/types";


const { agregarLibro } = useLibros();

const titulo = ref("");
const autor = ref("");
const region = ref("");
const pais = ref("");

const submitForm = async () => {
  try {
    const nuevoLibro: Libro = {
      titulo: titulo.value,
      autor: autor.value,
      region: region.value || null,
      pais: pais.value || null,
      genero: "Por definir", // Placeholder temporal
      subgenero: "Por definir", // Placeholder temporal
      disponible: true,
      created_at: new Date().toISOString(), 
    };

    await agregarLibro(nuevoLibro);

    titulo.value = "";
    autor.value = "";
    region.value = "";
    pais.value = "";

    alert("Libro registrado correctamente");
  } catch (error) {
    alert("Error al registrar el libro: " + (error as Error).message);
  }
};
</script>

<template>
    <div class="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Registrar Libro</h2>

        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
                <input
                    v-model="titulo"
                    type="text"
                    id="titulo"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Título del libro"
                    required
                />
            </div>

            <div class="mb-4">
                <label for="autor" class="block text-sm font-medium text-gray-700">Autor</label>
                <input
                    v-model="autor"
                    type="text"
                    id="autor"
                    class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Autor del libro"
                    required
                />
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

            <button
                type="submit"
                class="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
                Registrar Libro
            </button>
        </form>
    </div>
</template>