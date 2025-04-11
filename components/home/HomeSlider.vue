<script setup lang="ts">
import { ref } from 'vue'

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

const books = [
  { titulo: "Libro 1", autor: "Autor 1" },
  { titulo: "Libro 2", autor: "Autor 2" },
  { titulo: "Libro 3", autor: "Autor 3" },
  { titulo: "Libro 4", autor: "Autor 4" },
  { titulo: "Libro 5", autor: "Autor 5" },
  { titulo: "Libro 6", autor: "Autor 6" },
  { titulo: "Libro 7", autor: "Autor 7" },
  { titulo: "Libro 8", autor: "Autor 8" }
]
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
          v-for="(book, index) in books" 
          :key="index" 
          :titulo="book.titulo" 
          :autor="book.autor" 
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