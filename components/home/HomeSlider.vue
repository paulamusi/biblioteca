<script setup lang="ts">
import { ref } from 'vue'
import { useLibros } from "~/composables/useLibros";
import type { Libro } from "~/types/types";

const { obtenerLibrosRecomendados } = useLibros();

const { data: librosRecomendados, error } = await useAsyncData<Libro[]>("libro", obtenerLibrosRecomendados,);
if (error.value) {
  console.error("Error al obtener los libros:", error.value);
}
const sliderRef = ref<HTMLElement | null>(null)

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

</script>

<template>
    <div class="w-full md:w-[70vw] flex items-center justify-center mx-auto">
      <button 
        @click="scrollLeft" 
        class="bg-primary rounded-full m-2 text-5xl shadow-lg"
      >
        <p class="w-12 h-12"><</p>
      </button>
  
      <div 
        ref="sliderRef" 
        class="flex overflow-hidden scroll-smooth no-scrollbar px-4 snap-x snap-mandatory 
               w-full max-w-screen-xl justify-start"
      >
        <HomeCardSlider 
          v-for="(libro, index) in librosRecomendados" 
          :key="index" 
          :titulo="libro.titulo" 
          :autor="libro.autor" 
          class="snap-center flex-shrink-0"
        />
      </div>
  
      <button 
        @click="scrollRight" 
        class="bg-primary rounded-full m-2 text-5xl shadow-lg"
      >
      <p class="w-12 h-12">></p>
      </button>
    </div>
  </template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>